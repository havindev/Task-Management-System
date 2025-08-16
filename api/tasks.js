import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { userId, taskId } = req.query;

    switch (req.method) {
      case 'GET':
        return await getTasks(req, res, userId);
      case 'POST':
        return await createTask(req, res);
      case 'PUT':
        return await updateTask(req, res, taskId);
      case 'DELETE':
        return await deleteTask(req, res, taskId);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Task API error:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
}

async function getTasks(req, res, userId) {
  try {
    let tasks = [];
    try {
      tasks = await kv.get('tasks') || [];
    } catch (kvError) {
      console.warn('KV not available for getTasks:', kvError.message);
      tasks = [];
    }

    // Filter by userId if provided
    if (userId) {
      tasks = tasks.filter(task => task.userId === userId || task.userId === String(userId));
    }

    // Sort by creation date
    tasks.sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt));

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.json([]);
  }
}

async function createTask(req, res) {
  try {
    const { title, description, status, priority, dueDate, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title và userId là bắt buộc' });
    }

    let tasks = [];
    try {
      tasks = await kv.get('tasks') || [];
    } catch (kvError) {
      console.warn('KV not available for createTask:', kvError.message);
      // Return error if we can't persist
      return res.status(503).json({ error: 'Dịch vụ lưu trữ tạm thời không khả dụng' });
    }

    const newTask = {
      id: String(Date.now()),
      userId: String(userId),
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    try {
      await kv.set('tasks', tasks);
    } catch (kvError) {
      console.warn('KV not available for saving task:', kvError.message);
      return res.status(503).json({ error: 'Không thể lưu task' });
    }

    res.json(newTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Không thể tạo task' });
  }
}

async function updateTask(req, res, taskId) {
  try {
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID là bắt buộc' });
    }

    let tasks = [];
    try {
      tasks = await kv.get('tasks') || [];
    } catch (kvError) {
      console.warn('KV not available for updateTask:', kvError.message);
      return res.status(503).json({ error: 'Dịch vụ lưu trữ tạm thời không khả dụng' });
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task không tồn tại' });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    tasks[taskIndex] = updatedTask;
    try {
      await kv.set('tasks', tasks);
    } catch (kvError) {
      console.warn('KV not available for saving updated task:', kvError.message);
      return res.status(503).json({ error: 'Không thể cập nhật task' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Không thể cập nhật task' });
  }
}

async function deleteTask(req, res, taskId) {
  try {
    if (!taskId) {
      return res.status(400).json({ error: 'Task ID là bắt buộc' });
    }

    let tasks = [];
    try {
      tasks = await kv.get('tasks') || [];
    } catch (kvError) {
      console.warn('KV not available for deleteTask:', kvError.message);
      return res.status(503).json({ error: 'Dịch vụ lưu trữ tạm thời không khả dụng' });
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task không tồn tại' });
    }

    tasks.splice(taskIndex, 1);
    try {
      await kv.set('tasks', tasks);
    } catch (kvError) {
      console.warn('KV not available for saving after delete:', kvError.message);
      return res.status(503).json({ error: 'Không thể xóa task' });
    }

    res.json({ success: true, id: taskId });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Không thể xóa task' });
  }
}
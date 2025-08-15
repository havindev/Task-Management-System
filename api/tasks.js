// Vercel serverless function
const tasks = [
  {
    "title": "Môn Data Structure",
    "description": "Cấu trúc dữ liệu và giải thuật",
    "status": "completed",
    "priority": "high",
    "dueDate": "2025-01-30",
    "id": "1",
    "updatedAt": "2025-08-15T12:58:16.711Z"
  },
  {
    "id": "2",
    "userId": 1,
    "title": "ReactJs",
    "description": "Học ReactJS cơ bản và nâng cao",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2025-08-16",
    "createdAt": "2024-07-25T11:00:00.000Z",
    "updatedAt": "2024-07-26T09:15:00.000Z"
  },
  {
    "title": "PHP Laravel",
    "description": "PHP với framework Laravel",
    "status": "todo",
    "priority": "medium",
    "dueDate": "2025-09-20",
    "id": "3",
    "updatedAt": "2025-08-15T13:55:41.702Z"
  },
  {
    "id": "4",
    "userId": 2,
    "title": "Learn React Hooks",
    "description": "Học và thực hành useState, useEffect, useRef",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-08-10",
    "createdAt": "2024-07-24T09:00:00.000Z",
    "updatedAt": "2024-07-26T08:00:00.000Z"
  },
  {
    "id": "5",
    "userId": 2,
    "title": "Deploy Application",
    "description": "Deploy ứng dụng lên Vercel hoặc Netlify",
    "status": "todo",
    "priority": "low",
    "dueDate": "2024-08-25",
    "createdAt": "2024-07-24T10:00:00.000Z",
    "updatedAt": "2024-07-24T10:00:00.000Z"
  }
];

function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-cache');
}

export default function handler(req, res) {
  setCORSHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      return res.status(200).json(tasks);
    }
    
    if (req.method === 'POST') {
      const newTask = {
        ...req.body,
        id: String(tasks.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      tasks.push(newTask);
      return res.status(201).json(newTask);
    }
    
    if (req.method === 'PUT') {
      const { id } = req.query;
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body, updatedAt: new Date().toISOString() };
        return res.status(200).json(tasks[taskIndex]);
      } else {
        return res.status(404).json({ error: 'Task not found' });
      }
    }
    
    if (req.method === 'DELETE') {
      const { id } = req.query;
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return res.status(204).end();
      } else {
        return res.status(404).json({ error: 'Task not found' });
      }
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
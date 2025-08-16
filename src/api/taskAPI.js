import { initializeMockData, STORAGE_KEYS } from '../data/mockData';

// Initialize mock data on import
initializeMockData();

export const taskAPI = {
  getAllTasks: async (userId) => {
    try {
      let tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
      
      // Filter by userId if provided
      if (userId) {
        tasks = tasks.filter(task => task.userId === userId || task.userId === String(userId));
      }

      return tasks.sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt));
    } catch (error) {
      return [];
    }
  },

  getTaskById: async (taskId) => {
    try {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
      const task = tasks.find(t => t.id === taskId);
      
      if (!task) {
        throw new Error('Task không tồn tại');
      }

      return task;
    } catch (error) {
      throw error;
    }
  },

  createTask: async (taskData, userId) => {
    try {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
      
      const newTask = {
        ...taskData,
        id: String(Date.now()),
        userId: String(userId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      tasks.push(newTask);
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      
      return newTask;
    } catch (error) {
      throw new Error('Không thể tạo task. Vui lòng thử lại.');
    }
  },

  updateTask: async (taskId, taskData) => {
    try {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex === -1) {
        throw new Error('Task không tồn tại');
      }

      const updatedTask = {
        ...tasks[taskIndex],
        ...taskData,
        updatedAt: new Date().toISOString(),
      };

      tasks[taskIndex] = updatedTask;
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      
      return updatedTask;
    } catch (error) {
      throw new Error('Không thể cập nhật task. Vui lòng thử lại.');
    }
  },

  deleteTask: async (taskId) => {
    try {
      const tasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex === -1) {
        throw new Error('Task không tồn tại');
      }

      tasks.splice(taskIndex, 1);
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      
      return { success: true, id: taskId };
    } catch (error) {
      throw new Error('Không thể xóa task. Vui lòng thử lại.');
    }
  },

  updateTaskStatus: async (taskId, status) => {
    try {
      return await taskAPI.updateTask(taskId, { status });
    } catch (error) {
      throw new Error('Không thể cập nhật trạng thái task.');
    }
  },

  getTasksByStatus: async (userId, status) => {
    try {
      const allTasks = await taskAPI.getAllTasks(userId);
      return allTasks.filter(task => task.status === status);
    } catch (error) {
      throw error;
    }
  },

  getTasksByPriority: async (userId, priority) => {
    try {
      const allTasks = await taskAPI.getAllTasks(userId);
      return allTasks.filter(task => task.priority === priority);
    } catch (error) {
      throw error;
    }
  },

  searchTasks: async (userId, searchTerm) => {
    try {
      const allTasks = await taskAPI.getAllTasks(userId);

      if (!searchTerm) return allTasks;

      const searchLower = searchTerm.toLowerCase();
      return allTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      throw error;
    }
  },

  getTaskStatistics: async (userId) => {
    try {
      const tasks = await taskAPI.getAllTasks(userId);

      const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        overdue: tasks.filter(t => {
          const dueDate = new Date(t.dueDate);
          const today = new Date();
          return dueDate < today && t.status !== 'completed';
        }).length,
        completionRate: tasks.length > 0
          ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
          : 0
      };

      return stats;
    } catch (error) {
      throw error;
    }
  },

  bulkUpdateTasks: async (taskIds, updateData) => {
    try {
      const promises = taskIds.map(taskId => taskAPI.updateTask(taskId, updateData));
      await Promise.all(promises);
      return { success: true, updated: taskIds.length };
    } catch (error) {
      throw error;
    }
  }
};


export default taskAPI;
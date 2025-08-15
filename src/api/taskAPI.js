const API_BASE_URL = process.env.REACT_APP_API_URL || window.location.origin + '/api';


export const taskAPI = {

  getAllTasks: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const tasks = await response.json();


      return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Get all tasks error:', error);
      throw new Error('Không thể tải danh sách tasks. Vui lòng kiểm tra kết nối mạng.');
    }
  },


  getTaskById: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Task không tồn tại');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get task by ID error:', error);
      throw error;
    }
  },


  createTask: async (taskData, userId) => {
    try {
      const newTask = {
        ...taskData,
        userId: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const createdTask = await response.json();
      return createdTask;
    } catch (error) {
      console.error('Create task error:', error);
      throw new Error('Không thể tạo task. Vui lòng thử lại.');
    }
  },


  updateTask: async (taskId, taskData) => {
    try {
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      const updatedTask = {
        ...taskData,
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Task không tồn tại');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update task error:', error);
      throw new Error('Không thể cập nhật task. Vui lòng thử lại.');
    }
  },


  deleteTask: async (taskId) => {
    try {
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Task không tồn tại');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return { success: true, id: taskId };
    } catch (error) {
      console.error('Delete task error:', error);
      throw new Error('Không thể xóa task. Vui lòng thử lại.');
    }
  },


  updateTaskStatus: async (taskId, status) => {
    try {

      const currentTask = await taskAPI.getTaskById(taskId);


      const updatedTask = {
        ...currentTask,
        status: status,
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update task status error:', error);
      throw new Error('Không thể cập nhật trạng thái task.');
    }
  },


  getTasksByStatus: async (userId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${userId}&status=${status}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get tasks by status error:', error);
      throw error;
    }
  },


  getTasksByPriority: async (userId, priority) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${userId}&priority=${priority}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get tasks by priority error:', error);
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
      console.error('Search tasks error:', error);
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
      console.error('Get task statistics error:', error);
      throw error;
    }
  },


  bulkUpdateTasks: async (taskIds, updateData) => {
    try {
      const promises = taskIds.map(taskId => {
        return fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...updateData,
            updatedAt: new Date().toISOString(),
          }),
        });
      });

      const responses = await Promise.all(promises);


      const failed = responses.filter(r => !r.ok);
      if (failed.length > 0) {
        throw new Error(`${failed.length} tasks failed to update`);
      }

      return { success: true, updated: taskIds.length };
    } catch (error) {
      console.error('Bulk update tasks error:', error);
      throw error;
    }
  }
};


export const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTasksByStatus,
  getTasksByPriority,
  searchTasks,
  getTaskStatistics,
  bulkUpdateTasks
} = taskAPI;

export default taskAPI;

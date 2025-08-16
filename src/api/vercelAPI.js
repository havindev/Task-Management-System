// API base URL - will be the same domain when deployed to Vercel
const API_BASE = process.env.NODE_ENV === 'production' 
  ? '' // Same domain in production
  : 'http://localhost:3000'; // Local development

export const vercelAPI = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  },

  verifySession: async (userId) => {
    const response = await fetch(`${API_BASE}/api/auth/verify?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result.valid;
  },

  // Task endpoints
  getAllTasks: async (userId) => {
    const response = await fetch(`${API_BASE}/api/tasks?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  },

  createTask: async (taskData, userId) => {
    const response = await fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...taskData, userId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create task');
    }

    return response.json();
  },

  updateTask: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE}/api/tasks?taskId=${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update task');
    }

    return response.json();
  },

  deleteTask: async (taskId) => {
    const response = await fetch(`${API_BASE}/api/tasks?taskId=${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete task');
    }

    return response.json();
  },
};

export default vercelAPI;
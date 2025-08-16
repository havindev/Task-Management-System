import { initializeMockData, STORAGE_KEYS } from '../data/mockData';

// Initialize mock data on import
initializeMockData();

export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('🔄 Login function started');
      console.log('🔍 Credentials:', credentials);
      
      // Ensure localStorage is available
      if (typeof localStorage === 'undefined') {
        throw new Error('localStorage is not available');
      }
      
      console.log('🔄 Using localStorage for auth');
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      console.log('👥 Users found:', users.length);
      
      const foundUser = users.find(
        user =>
          user.username === credentials.username &&
          user.password === credentials.password
      );

      if (!foundUser) {
        throw new Error('Username hoặc password không đúng');
      }

      const token = `token_${foundUser.id}_${Date.now()}`;

      return {
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        },
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    return { success: true };
  },

  verifySession: async (userId, token) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      return users.some(user => user.id === userId);
    } catch (error) {
      console.error('Session verification error:', error);
      return false;
    }
  },

  getUserProfile: async (userId) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      };
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      
      // Check if username exists
      const existingUser = users.find(u => u.username === userData.username);
      if (existingUser) {
        throw new Error('Username đã tồn tại');
      }

      // Check if email exists
      const existingEmail = users.find(u => u.email === userData.email);
      if (existingEmail) {
        throw new Error('Email đã tồn tại');
      }

      const newUser = {
        id: String(users.length + 1),
        username: userData.username,
        password: userData.password,
        email: userData.email,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      const token = `token_${newUser.id}_${Date.now()}`;

      return {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        token
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
};

export const { login, logout, verifySession, getUserProfile, register } = authAPI;

export default authAPI;
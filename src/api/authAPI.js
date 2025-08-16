import { initializeMockData, STORAGE_KEYS } from '../data/mockData';

initializeMockData();

export const authAPI = {
  login: async (credentials) => {
    try {
      // console.log('Login attempt for:', credentials.username);
      
      if (typeof localStorage === 'undefined') {
        throw new Error('localStorage is not available');
      }
      
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      
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
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
      
      const existingUser = users.find(u => u.username === userData.username);
      if(existingUser) {
        throw new Error('Username đã tồn tại');
      }

      const existingEmail = users.find(u => u.email === userData.email);
      if(existingEmail) {
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
      throw error;
    }
  }
};

export default authAPI;
import { initializeMockData, STORAGE_KEYS } from '../data/mockData';

const API_BASE_URL = process.env.REACT_APP_API_URL || window.location.origin + '/api';

// Initialize mock data on import
initializeMockData();

const shouldUseLocalStorage = () => {
  // ALWAYS use localStorage - simplified approach
  console.log('🔄 Using localStorage (forced for reliability)');
  return true;
};

export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('🔄 Using localStorage for auth');
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
      console.error('Login error:', error);
      throw error;
    }
  },


  logout: async () => {
    try {

      return { success: true };
    } catch (error) {
      console.error('Logout API error:', error);
      throw error;
    }
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
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const user = await response.json();
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

      const existingResponse = await fetch(`${API_BASE_URL}/users?username=${userData.username}`);
      const existingUsers = await existingResponse.json();

      if (existingUsers.length > 0) {
        throw new Error('Username đã tồn tại');
      }


      const emailResponse = await fetch(`${API_BASE_URL}/users?email=${userData.email}`);
      const existingEmails = await emailResponse.json();

      if (existingEmails.length > 0) {
        throw new Error('Email đã tồn tại');
      }


      const newUser = {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const createdUser = await response.json();
      const token = `token_${createdUser.id}_${Date.now()}`;

      return {
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
        },
        token
      };
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  }
};


export const { login, logout, verifySession, getUserProfile, register } = authAPI;

export default authAPI;

// Mock data for development and fallback
export const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    email: "admin@taskmanager.com",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "2", 
    username: "hieu",
    password: "hieu123",
    email: "hieu@taskmanager.com",
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: "3",
    username: "demo",
    password: "demo123", 
    email: "demo@taskmanager.com",
    createdAt: "2024-01-03T00:00:00.000Z"
  }
];

export const mockTasks = [
  {
    title: "Môn Data Structure",
    description: "Cấu trúc dữ liệu và giải thuật",
    status: "completed",
    priority: "high",
    dueDate: "2025-01-30",
    id: "1",
    userId: "1",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2025-08-15T12:58:16.711Z"
  },
  {
    id: "2",
    userId: "1",
    title: "ReactJs",
    description: "Học ReactJS cơ bản và nâng cao", 
    status: "in-progress",
    priority: "high",
    dueDate: "2025-08-16",
    createdAt: "2024-07-25T11:00:00.000Z",
    updatedAt: "2024-07-26T09:15:00.000Z"
  },
  {
    title: "PHP Laravel",
    description: "PHP với framework Laravel",
    status: "todo", 
    priority: "medium",
    dueDate: "2025-09-20",
    id: "3",
    userId: "1",
    createdAt: "2024-01-03T00:00:00.000Z",
    updatedAt: "2025-08-15T13:55:41.702Z"
  },
  {
    id: "4",
    userId: "2", 
    title: "Learn React Hooks",
    description: "Học và thực hành useState, useEffect, useRef",
    status: "in-progress",
    priority: "high", 
    dueDate: "2024-08-10",
    createdAt: "2024-07-24T09:00:00.000Z",
    updatedAt: "2024-07-26T08:00:00.000Z"
  },
  {
    id: "5",
    userId: "2",
    title: "Deploy Application", 
    description: "Deploy ứng dụng lên Vercel hoặc Netlify",
    status: "todo",
    priority: "low",
    dueDate: "2024-08-25",
    createdAt: "2024-07-24T10:00:00.000Z", 
    updatedAt: "2024-07-24T10:00:00.000Z"
  }
];

// Local storage keys
export const STORAGE_KEYS = {
  USERS: 'taskapp_users',
  TASKS: 'taskapp_tasks',
  INITIALIZED: 'taskapp_initialized'
};

// Initialize localStorage with mock data if not exists
export const initializeMockData = () => {
  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!initialized) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(mockTasks));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    // console.log('Mock data initialized'); // debug
  }
};
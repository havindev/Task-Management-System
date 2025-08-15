// Vercel serverless function
const users = [
  {
    "id": "1",
    "username": "admin",
    "password": "password123",
    "email": "admin@taskmanager.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "2",
    "username": "user1",
    "password": "userpass123",
    "email": "user1@taskmanager.com",
    "createdAt": "2024-01-02T00:00:00.000Z"
  },
  {
    "id": "3",
    "username": "demo",
    "password": "demo123",
    "email": "demo@taskmanager.com",
    "createdAt": "2024-01-03T00:00:00.000Z"
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
      return res.status(200).json(users);
    } 
    
    if (req.method === 'POST') {
      const { username, password, email } = req.body;
      const newUser = {
        id: String(users.length + 1),
        username,
        password,
        email,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      return res.status(201).json(newUser);
    }

    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
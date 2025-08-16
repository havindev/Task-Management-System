import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username và password là bắt buộc' });
    }

    // Default users fallback
    const defaultUsers = [
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

    let users;
    try {
      // Try to get users from KV store
      users = await kv.get('users');
      if (!users) {
        users = defaultUsers;
        await kv.set('users', users);
      }
    } catch (kvError) {
      // Fallback to default users if KV is not available
      console.warn('KV not available, using default users:', kvError.message);
      users = defaultUsers;
    }

    // Find user
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ error: 'Username hoặc password không đúng' });
    }

    const token = `token_${user.id}_${Date.now()}`;

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
}
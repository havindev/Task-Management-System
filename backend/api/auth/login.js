import { kv } from '@vercel/kv';
import { setCORSHeaders, handlePreflight } from '../../utils/cors.js';
import { defaultUsers } from '../../utils/userData.js';

export default async function handler(req, res) {
  setCORSHeaders(res);
  
  if (handlePreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username và password là bắt buộc' });
    }

    let users;
    try {
      users = await kv.get('users');
      if (!users) {
        users = defaultUsers;
        await kv.set('users', users);
      }
    } catch (kvError) {
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
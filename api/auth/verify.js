import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.json({ valid: false });
    }

    // Get users from KV store with fallback
    let users = [];
    try {
      users = await kv.get('users') || [];
    } catch (kvError) {
      console.warn('KV not available for verify:', kvError.message);
      // Fallback: assume user exists if we can't verify
      return res.json({ valid: true });
    }
    const userExists = users.some(u => u.id === userId);

    res.json({ valid: userExists });

  } catch (error) {
    console.error('Verify error:', error);
    res.json({ valid: false });
  }
}
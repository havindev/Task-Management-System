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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { username, password, email } = req.body;
    const newUser = {
      id: String(users.length + 1),
      username,
      password,
      email,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
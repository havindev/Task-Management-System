import { kv } from '@vercel/kv';

const dbJsonTasks = [
  {
    "title": "Môn Data Structure",
    "description": "Cấu trúc dữ liệu và giải thuật",
    "status": "completed",
    "priority": "high",
    "dueDate": "2025-01-30",
    "id": "1",
    "userId": "1",
    "createdAt": "2024-07-25T10:00:00.000Z",
    "updatedAt": "2025-08-15T12:58:16.711Z"
  },
  {
    "id": "2",
    "userId": "1",
    "title": "ReactJs",
    "description": "Học ReactJS cơ bản và nâng cao",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2025-08-16",
    "createdAt": "2024-07-25T11:00:00.000Z",
    "updatedAt": "2024-07-26T09:15:00.000Z"
  },
  {
    "title": "PHP Laravel",
    "description": "PHP với framework Laravel",
    "status": "todo",
    "priority": "medium",
    "dueDate": "2025-09-20",
    "id": "3",
    "userId": "1",
    "createdAt": "2024-07-25T12:00:00.000Z",
    "updatedAt": "2025-08-15T13:55:41.702Z"
  },
  {
    "id": "4",
    "userId": "2",
    "title": "Learn React Hooks",
    "description": "Học và thực hành useState, useEffect, useRef",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-08-10",
    "createdAt": "2024-07-24T09:00:00.000Z",
    "updatedAt": "2024-07-26T08:00:00.000Z"
  },
  {
    "id": "5",
    "userId": "2",
    "title": "Deploy Application",
    "description": "Deploy ứng dụng lên Vercel hoặc Netlify",
    "status": "todo",
    "priority": "low",
    "dueDate": "2024-08-25",
    "createdAt": "2024-07-24T10:00:00.000Z",
    "updatedAt": "2024-07-24T10:00:00.000Z"
  }
];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if migration already done
    const migrationCheck = await kv.get('db_json_migrated');
    if (migrationCheck) {
      return res.json({ 
        success: false, 
        message: 'Migration already completed',
        migrated: 0
      });
    }

    let existingTasks = [];
    try {
      existingTasks = await kv.get('tasks') || [];
    } catch (kvError) {
      return res.status(503).json({ error: 'KV database not available' });
    }

    // Add db.json tasks to existing tasks
    const migratedTasks = [...existingTasks, ...dbJsonTasks];
    
    try {
      await kv.set('tasks', migratedTasks);
      await kv.set('db_json_migrated', true);
    } catch (kvError) {
      return res.status(503).json({ error: 'Failed to save migrated data' });
    }

    res.json({ 
      success: true, 
      message: 'Migration completed successfully',
      migrated: dbJsonTasks.length,
      tasks: dbJsonTasks
    });

  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({ error: 'Migration failed' });
  }
}
export const migrateLocalStorageToAPI = async (vercelAPI, userId) => {
  try {
    // Check if migration already done
    const migrationKey = `migrated_${userId}`;
    if (localStorage.getItem(migrationKey)) {
      console.log('Migration already completed for user:', userId);
      return false;
    }

    // Get old tasks from localStorage
    const oldTasks = localStorage.getItem('tasks');
    if (!oldTasks) {
      console.log('No old tasks found in localStorage');
      return false;
    }

    const tasks = JSON.parse(oldTasks);
    const userTasks = tasks.filter(task => task.userId === userId || task.userId === String(userId));
    
    if (userTasks.length === 0) {
      console.log('No tasks found for user:', userId);
      return false;
    }

    console.log(`Found ${userTasks.length} tasks to migrate for user ${userId}`);

    // Migrate each task to API
    let migratedCount = 0;
    for (const task of userTasks) {
      try {
        await vercelAPI.createTask(task, userId);
        migratedCount++;
      } catch (error) {
        console.warn('Failed to migrate task:', task.title, error.message);
      }
    }

    // Mark migration as completed
    localStorage.setItem(migrationKey, 'true');
    
    console.log(`Successfully migrated ${migratedCount}/${userTasks.length} tasks`);
    return migratedCount > 0;
    
  } catch (error) {
    console.error('Migration error:', error);
    return false;
  }
};
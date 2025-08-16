export const migrateLocalStorageToAPI = async (vercelAPI, userId) => {
  try {
    // Check if migration already done
    const migrationKey = `migrated_${userId}`;
    if (localStorage.getItem(migrationKey)) {
      return false;
    }

    // Get old tasks from localStorage
    const oldTasks = localStorage.getItem('tasks');
    if (!oldTasks) {
      return false;
    }

    const tasks = JSON.parse(oldTasks);
    const userTasks = tasks.filter(task => task.userId === userId || task.userId === String(userId));
    
    if (userTasks.length === 0) {
      return false;
    }


    // Migrate each task to API
    let migratedCount = 0;
    for (const task of userTasks) {
      try {
        await vercelAPI.createTask(task, userId);
        migratedCount++;
      } catch (error) {
        // Skip failed migrations
      }
    }

    // Mark migration as completed
    localStorage.setItem(migrationKey, 'true');
    
    return migratedCount > 0;
    
  } catch (error) {
    // Migration failed silently
    return false;
  }
};
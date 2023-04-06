const cron = require('node-cron');
const backupService = require('./backupService');

// Schedule a task to run every 4 hours
cron.schedule('0 */4 * * *', async () => {
  try {
    await backupService();
    console.log('Task completed successfully');
  } catch (error) {
    console.error('Error in scheduled task:', error);
  }
});

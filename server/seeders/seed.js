const db = require('../config/connection');
// Import seeds

db.once('open', async () => {
  try {
    // Await seeds

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

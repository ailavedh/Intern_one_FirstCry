const db = require('./config/db');

async function main() {
  try {
    await db.initializeSchema();
    console.log('Successfully connected to DB. Type:', db.dbType());
    const users = await db.query('SELECT id, name, email, role FROM users');
    console.log('Users in database:', users);
    process.exit(0);
  } catch (err) {
    console.error('Error querying database:', err);
    process.exit(1);
  }
}

main();

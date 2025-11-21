const path = require('path');
const Database = require('better-sqlite3');

const file = process.env.SQLITE_FILE || path.join(__dirname, 'data.sqlite');
const db = new Database(file);

// initialize schema
const init = () => {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS checks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT,
      completed INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `).run();
};

init();

module.exports = db;

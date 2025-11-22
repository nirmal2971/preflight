// backend/db.js
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// use the mount path you configured in Northflank
const file = process.env.SQLITE_FILE || path.join(__dirname, 'data.sqlite');

// Ensure parent directory exists (create it if not).
// This prevents "Cannot open database because the directory does not exist"
const dir = path.dirname(file);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  // optionally set permissive permissions; avoid in production unless necessary
  // fs.chmodSync(dir, 0o755);
}

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

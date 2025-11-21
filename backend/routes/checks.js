const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { createSchema, updateSchema } = require('../validators/checks');

function nowISO(){ return new Date().toISOString(); }

// List with optional filter /pagination
// GET /api/checks?filter=all|active|completed&limit=50&offset=0
router.get('/', (req, res) => {
  const { filter = 'all', limit = 100, offset = 0 } = req.query;
  let sql = 'SELECT * FROM checks';
  const params = [];
  if (filter === 'active') { sql += ' WHERE completed = 0'; }
  else if (filter === 'completed') { sql += ' WHERE completed = 1'; }
  sql += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));
  const rows = db.prepare(sql).all(...params);
  const items = rows.map(r => ({ ...r, completed: !!r.completed }));
  res.json(items);
});

// Get single
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const row = db.prepare('SELECT * FROM checks WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  row.completed = !!row.completed;
  res.json(row);
});

// Create
router.post('/', (req, res) => {
  const { error, value } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const id = uuidv4();
  const createdAt = nowISO();
  const stmt = db.prepare(`
    INSERT INTO checks (id, title, description, priority, completed, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, 0, ?, ?)
  `);
  stmt.run(id, value.title, value.description || '', value.priority, createdAt, createdAt);
  const row = db.prepare('SELECT * FROM checks WHERE id = ?').get(id);
  row.completed = !!row.completed;
  res.status(201).json(row);
});

// Update
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const existing = db.prepare('SELECT * FROM checks WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const { error, value } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const updatedAt = nowISO();
  const updated = {
    title: value.title !== undefined ? value.title : existing.title,
    description: value.description !== undefined ? value.description : existing.description,
    priority: value.priority !== undefined ? value.priority : existing.priority,
    completed: value.completed !== undefined ? (value.completed ? 1 : 0) : existing.completed
  };

  db.prepare(`
    UPDATE checks
    SET title = ?, description = ?, priority = ?, completed = ?, updatedAt = ?
    WHERE id = ?
  `).run(updated.title, updated.description, updated.priority, updated.completed, updatedAt, id);

  const row = db.prepare('SELECT * FROM checks WHERE id = ?').get(id);
  row.completed = !!row.completed;
  res.json(row);
});

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const result = db.prepare('DELETE FROM checks WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;

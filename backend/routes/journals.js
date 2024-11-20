const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Get all journals
router.get('/', (req, res) => {
  const query = 'SELECT * FROM journals';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get a single journal by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM journals WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json(results[0]);
  });
});


// Create a new journal
router.post('/', (req, res) => {
  const { title, description, cover_photo } = req.body;
  const query = 'INSERT INTO journals (title, description, cover_photo) VALUES (?, ?, ?)';
  db.query(query, [title, description, cover_photo], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, title, description, cover_photo });
  });
});

// Delete a journal
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM journals WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Journal deleted successfully' });
  });
});

// Update a journal
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, cover_photo } = req.body;
  const query = 'UPDATE journals SET title = ?, description = ?, cover_photo = ? WHERE id = ?';
  db.query(query, [title, description, cover_photo, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Journal updated successfully' });
  });
});

module.exports = router;
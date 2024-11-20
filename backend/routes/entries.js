const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Add a new entry
router.post('/:journal_id', (req, res) => {
  const { journal_id } = req.params;
  const { photo, text } = req.body;
  const query = 'INSERT INTO entries (journal_id, photo, text) VALUES (?, ?, ?)';
  db.query(query, [journal_id, photo, text], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, journal_id, photo, text });
  });
});

// Get all entries for a journal
router.get('/:journal_id', (req, res) => {
  const { journal_id } = req.params;
  const query = 'SELECT * FROM entries WHERE journal_id = ?';
  db.query(query, [journal_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Delete an entry
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM entries WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Entry deleted successfully' });
  });
});

module.exports = router;
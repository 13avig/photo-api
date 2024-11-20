const express = require('express');
const axios = require('axios');
const router = express.Router();

const UNSPLASH_API_BASE = 'https://api.unsplash.com';

// Search Unsplash for images
router.get('/search', async (req, res) => {
  const { query, page = 1, per_page = 10 } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`${UNSPLASH_API_BASE}/search/photos`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      params: { query, page, per_page },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error.message);
    res.status(500).json({ error: 'Unable to fetch images from Unsplash' });
  }
});

module.exports = router;
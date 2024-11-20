require('dotenv').config();
const express = require('express');
const cors = require('cors');
const journalRoutes = require('./routes/journals');
const entryRoutes = require('./routes/entries');
const unsplashRoutes = require('./routes/unsplash');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/journals', journalRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/unsplash', unsplashRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
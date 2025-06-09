// server.js
const express = require('express');
const path = require('path');
const backend = require('./backend/app'); // Existing Express app

const app = express();
const port = process.env.PORT || 3000;

// Serve static frontend build
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Mount backend API under /api
app.use('/api', backend);

// Fallback to React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const cors = require('cors');

// === Setup Express App ===
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// === API routes (mocked for demo purposes) ===
app.get('/api/healthcheck', (req, res) => {
  res.json({ status: 'ok' });
});

// === Serve frontend static build ===
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// server.js
const express = require('express');
const path = require('path');

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server on the designated PORT or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
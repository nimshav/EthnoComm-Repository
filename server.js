// Import required modules
const express = require('express');
const path = require('path');

// Initialize the Express application
const app = express();

// Serve static files from the "public" directory, including "EOC_Library"
app.use(express.static(path.join(__dirname, 'public')));

// Define a fallback route for non-static file requests to serve the index.html file
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'public', req.path);
    
    // Check if the requested file exists in the public directory
    if (path.extname(req.path) && !filePath.includes('index.html')) {
        res.status(404).send('File not found');
    } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});

// Start the server on the correct port for Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
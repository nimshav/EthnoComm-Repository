// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize the Express application
const app = express();

// Serve static files from the "public" directory, including "EOC_Library"
app.use(express.static(path.join(__dirname, 'public')));

// Define a fallback route for non-static file requests to serve the index.html file
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'public', req.path);

    // Check if the requested path corresponds to a valid file in the public directory
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err && path.extname(req.path)) {
            // Serve the file if it exists
            res.sendFile(filePath);
        } else {
            // Fallback to index.html for all other routes
            res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                }
            });
        }
    });
});

// Start the server on the correct port for Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
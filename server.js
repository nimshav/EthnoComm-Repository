// Import required modules
const express = require('express');
const path = require('path');

// Initialize the Express application
const app = express();

// Serve static files from the "public" directory, including "EOC_Library"
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log requests for debugging purposes
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Handle requests that are not matched by static files
app.get('*', (req, res) => {
    // Ensure fallback to index.html only for non-static file requests
    const filePath = path.join(__dirname, 'public', req.path);
    const ext = path.extname(req.path);

    if (ext) {
        // If a file with an extension is requested but doesn't exist, return 404
        res.status(404).send('File not found');
    } else {
        // Otherwise, fallback to index.html
        res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
            if (error) {
                console.error(`Error serving index.html: ${error.message}`);
                res.status(500).send('Internal Server Error');
            }
        });
    }
});

// Start the server on the correct port for Heroku or local environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

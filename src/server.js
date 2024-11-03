const express = require('express');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Keep the original file name
    }
});

const upload = multer({ storage: storage }); // Create the upload instance

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Trade Compliance Tool API!');
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File ${req.file.originalname} uploaded successfully!`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

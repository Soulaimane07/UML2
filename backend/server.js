const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json()); 

const url = 'mongodb://localhost:27017';
const dbName = 'uml';
let db;







// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch((err) => console.error('MongoDB connection error:', err));






app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Fetch all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await db.collection('projects').find().toArray(); // Fetch all documents
        res.json(projects);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new project
app.post('/projects', async (req, res) => {
    try {
        const project = req.body; // Ensure the body contains the required data
        const result = await db.collection('projects').insertOne(project); // Insert into MongoDB
        res.status(201).json(result); // Return the inserted document
    } catch (err) {
        res.status(400).send(err.message); // Send the error message
    }
});






// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

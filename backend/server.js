const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = process.env.PORT || 3001;
const db = require('./db'); // Import the database connection

app.use(bodyParser.json());
app.use(cors());
// Registration route
app.post('/register', (req, res) => {
    const { username, password, email, mobile } = req.body;

    const insertQuery = `INSERT INTO users (username, password, email, mobile) VALUES (?, ?, ?, ?)`;

    db.run(insertQuery, [username, password, email, mobile], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ message: 'Registration successful' });
    });
});
app.get('/users', (req, res) => {
    // Query the database to retrieve user data
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows }); // Return the user data as JSON
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

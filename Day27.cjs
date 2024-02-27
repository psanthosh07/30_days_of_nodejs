const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = 'ABC47';

const users = [
    { id: 1, username: 'Ash', password: 'Ash@123', role: 'admin' },
    { id: 2, username: 'Ben', password: 'Ben@123', role: 'user' }
];

function authenticateAndAuthorize(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token is required.' });
    }

    try {

        const decoded = jwt.verify(token, secretKey);
        
        const user = users.find(u => u.id === decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        req.user = user;


        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Insufficient permissions. Admin role required.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user.id }, secretKey);

    res.json({ token });
});

app.get('/admin/dashboard', authenticateAndAuthorize, (req, res) => {
    res.json({ message: 'Welcome to admin dashboard!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

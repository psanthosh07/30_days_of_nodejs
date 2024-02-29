const express = require('express');
const errorHandler = require('./errorHandler');

const app = express();

// Example route that throws an error
app.get('/example', (req, res, next) => {
    // Simulating an error
    const error = new Error('Example error');
    error.statusCode = 400; // Custom status code
    next(error);
});

// Other routes and middleware can go here...

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

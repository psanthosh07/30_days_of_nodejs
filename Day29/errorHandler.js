
function errorHandler(err, req, res, next) {
    // Default status code is 500 (Internal Server Error)
    let statusCode = err.statusCode || 500;
    // Default error message
    let message = err.message || 'Internal Server Error';

    // Log the error for debugging purposes
    console.error(err);

    // Send the error response to the client
    res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;

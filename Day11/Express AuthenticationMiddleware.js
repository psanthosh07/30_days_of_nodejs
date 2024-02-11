 const jwt = require('jsonwebtoken');

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    // No token found, return 401 Unauthorized
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, 'secretKey'); // Replace 'secretKey' with your actual secret key

    // Attach the decoded user information to the request for future use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // JWT verification failed, return 401 Unauthorized
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = authenticationMiddleware;

const jwt = require('jsonwebtoken');

// Authentication Middleware: Verifies the JWT token
const authMiddleware = (req, res, next) => {
  // Get token from the request header
  const token = req.header('x-auth-token');

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    
    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid token
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Placeholder for future middleware (if needed)
const checkAuth = (req, res, next) => {
  // Additional authentication logic can be placed here
  next();
};

module.exports = {
  authMiddleware,
  checkAuth,
};

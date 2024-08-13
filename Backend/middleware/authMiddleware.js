const jwt = require('jsonwebtoken');

// Authentication Middleware: Verifies the JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const checkAuth = (req, res, next) => {
  next();
};

module.exports = {
  authMiddleware,
  checkAuth,
};

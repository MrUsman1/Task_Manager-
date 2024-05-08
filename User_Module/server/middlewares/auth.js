const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Middleware function to restrict access to authenticated users only
exports.isAuthenticated = (req, res, next) => {
  if (!req.userId) {
    return res.status(403).json({ message: 'Access forbidden' });
  }
  next();
};

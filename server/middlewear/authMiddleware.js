const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/index');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.patient = decoded; // Store patient ID in request
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
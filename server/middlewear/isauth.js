const jwt = require('jsonwebtoken');

const isAuth = (requiredRole) => (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid bearer token' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const payload = jwt.verify(token,process.env.SECRET_KEY);

    // Allow access to user's own profile 
    if (requiredRole === 'user') {
      req.user = payload;
      return next();
    }

    // Allow admin role to access anything
    if (requiredRole === 'admin') {
      req.user = payload;
      return next();
    }

    // Check the required role
    if (requiredRole && payload.role !== requiredRole) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = isAuth;
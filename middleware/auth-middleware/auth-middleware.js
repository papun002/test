const jwt = require('jsonwebtoken');
const Firm = require('../models/Firm');

const JWT_SECRET = "hjuyu8hj#23"; // keep same as in utils/jwt.js

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const firm = await Firm.findByPk(decoded.id);

    if (!firm) {
      return res.status(401).json({ message: 'Not authorized, firm not found' });
    }

    req.firm = firm; // attach firm to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};


const jwt = require('jsonwebtoken');
const JWT_SECRET = "hjuyu8hj#23"; // Ideally, use an environment variable

// Generate JWT token
exports.generateToken = (firm) => {
  return jwt.sign(
    { id: firm.id, mobileNo: firm.mobileNo },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT token
exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);

};

const jwt = require('jsonwebtoken');
const Firm = require("../../models/auth/signup");
const staffModel = require("../../models/staff/staff.model");
// Middleware to extract cid from JWT token and attach to request
exports.getCid = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify the token
    const decoded = jwt.verify(token, "hjuyu8hj#23");

    // Find user in DB
    let user = null;

    // Find user in DB
    if (decoded.role === "owner") {
      user = await Firm.findByPk(decoded.id);
    } else if (decoded.role === "manager") {
      user = await staffModel.findByPk(decoded.id);
    }


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Attach cid and user info to request
    // req.user = user;

    if (decoded.role === "manager") {
      req.sid = user.id;
      req.cid = user.cid;
    } else {
      req.cid = user.id;
    }

    req.role = decoded.role; // assuming user has a role field

    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


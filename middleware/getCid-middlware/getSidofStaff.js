const jwt = require("jsonwebtoken");
const StaffModel = require("../../models/staff/staff.model");
// Middleware to extract sid from JWT token and attach to request
exports.getSidOfStaff = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify the token
    const decoded = jwt.verify(token, "hjuyu8hj#23");

    // Find user in DB
    const user = await StaffModel.findByPk(decoded.id); // or findOne({ where: { id: decoded.id } })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Attach sid and user info to request
    // req.user = user;
    req.sid = user.id;
    req.cid = user.cid;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

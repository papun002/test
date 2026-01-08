const Firm = require("../../models/auth/signup");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const staffModel = require("../../models/staff/staff.model");

exports.signup = async (req, res) => {
  const { fname, mobile, password } = req.body;
  try {
    // Check if mobile number already exists
    const existingFirm = await Firm.findOne({ where: { mobileNo: mobile } });
    if (existingFirm) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Create new firm
    const newFirm = await Firm.create({
      firmName: fname,
      mobileNo: mobile,
      password,
    });
    return res
      .status(201)
      .json({ message: "Firm registered successfully", firm: newFirm });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { mobileNo, password } = req.body;

  if (!mobileNo && !password) {
    return res
      .status(400)
      .json({ message: "Mobile number and password are required" });
  }

  try {
    // Find firm by mobile number
    const firm = await Firm.findOne({ where: { mobileNo: mobileNo } });
    if (!firm) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, firm.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    // Optionally, create a JWT token
    const token = jwt.sign(
      { id: firm.id, mobileNo: firm.mobileNo, role: "owner" },
      "hjuyu8hj#23",
      { expiresIn: "24hr" }
    );

    // Exclude password from response
    const { password: _, ...firmData } = firm.toJSON();

    return res
      .status(200)
      .json({ message: "Login successful", firm: firmData.firmName, name: firmData.name, token, role: firmData.role });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.staffLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const staff = await staffModel.findOne({
      where: {
        phone: mobile,
        status: true,
        isDeleted: false,
      },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found or inactive" });
    }

    /* 🔐 ROLE CHECK */
    if (staff.role !== "conductor") {
      return res
        .status(403)
        .json({ message: "Access denied. Only conductors can login here." });
    }

    /* 🔐 PASSWORD CHECK (Conductor: optional password) */
    if (password && staff.password && password !== staff.password) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    /* 🔑 CREATE TOKEN (STANDARD PAYLOAD) */
    const token = jwt.sign(
      {
        id: staff.id,
        role: staff.role,
        cid: staff.cid,
      },
      "hjuyu8hj#23",
      { expiresIn: "24h" }
    );

    /* 🧹 REMOVE PASSWORD */
    const { password: _, ...staffData } = staff.toJSON();

    return res.status(200).json({
      message: "Login successful",
      staff: {
        id: staffData.id,
        name: staffData.name,
        nickName: staffData.nickName,
        mobile: staffData.phone,
        role: staffData.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in staff login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.managerLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const staff = await staffModel.findOne({
      where: {
        phone: mobile,
        status: true,
        isDeleted: false,
      },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found or inactive" });
    }

    /* 🔐 ROLE CHECK */
    if (staff.role !== "manager") {
      return res
        .status(403)
        .json({ message: "Access denied. Only managers can login here." });
    }

    /* 🔐 PASSWORD CHECK (Conductor: optional password) */
    if (password && staff.password && password !== staff.password) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    /* 🔑 CREATE TOKEN (STANDARD PAYLOAD) */
    const token = jwt.sign(
      {
        id: staff.id,
        role: staff.role,
        cid: staff.cid,
      },
      "hjuyu8hj#23",
      { expiresIn: "24h" }
    );

    /* 🧹 REMOVE PASSWORD */
    const { password: _, ...staffData } = staff.toJSON();

    return res.status(200).json({
      message: "Login successful",
      staff: {
        id: staffData.id,
        name: staffData.name,
        nickName: staffData.nickName,
        mobile: staffData.phone,
        role: staffData.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in staff login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const Firm = require('../../models/auth/signup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { fname, mobile, password } = req.body;
    try {
    // Check if mobile number already exists
    const existingFirm = await Firm.findOne({ where: { mobileNo: mobile } });
    if (existingFirm) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Create new firm
    const newFirm = await Firm.create({ firmName: fname, mobileNo: mobile, password });
    return res.status(201).json({ message: "Firm registered successfully", firm: newFirm });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { mobileNo, password } = req.body;

  if (!mobileNo || !password) {
    return res.status(400).json({ message: "Mobile number and password are required" });
  }

  try {
    // Find firm by mobile number
    const firm = await Firm.findOne({ where: { mobileNo: mobileNo } });
    if (!firm) {
      return res.status(400).json({ message: "Invalid mobile number or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, firm.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid mobile number or password" });
    }

    // Optionally, create a JWT token
    const token = jwt.sign({ id: firm.id, mobileNo: firm.mobileNo }, "hjuyu8hj#23", { expiresIn: "24hr" });

    // Exclude password from response
    const { password: _, ...firmData } = firm.toJSON();

    return res.status(200).json({ message: "Login successful", firm: firmData.firmName, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


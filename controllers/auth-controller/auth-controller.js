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

// conductor login
exports.conductorLogin = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    // Find active, non-deleted staff
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

    // Conductor login (password optional)
    if (staff.role === "conductor") {
      // Optional: check password only if provided
      if (password && staff.password && password !== staff.password) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number or password" });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: staff.id, mobile: staff.phone, role: staff.role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      // Exclude password from response
      const { password: _, ...staffData } = staff.toJSON();

      return res.status(200).json({
        message: "Login successful",
        staff: staffData,
        token,
      });
    }

    // Other roles (optional password check)
    if (!password || staff.password !== password) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    // Create JWT token for non-conductor staff
    const token = jwt.sign(
      { id: staff.id, mobile: staff.phone, role: staff.role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    const { password: _, ...staffData } = staff.toJSON();

    return res.status(200).json({
      message: "Login successful",
      staff: {
        name: staffData.name,
        nickName: staffData.nickName,
        mobile: staffData.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




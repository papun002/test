const staffModel = require("../../models/staff/staff.model");

exports.createStaff = async (req, res) => {
  try {
    const { name, nickName, mobile, role, address } = req.body;

    // Check if staff with same mobile already exists
    const existingStaff = await staffModel.findOne({
      where: { phone: mobile, cid: req.cid },
    });

    if (existingStaff) {
      return res.status(400).json({
        message: "Staff with this phone number already exists",
      });
    }

    // Insert new staff record
    const newStaff = await staffModel.create({
      name,
      nickName,
      phone: mobile,
      role,
      address,
      cid: req.cid,
      status: true,
    });
    return res
      .status(201)
      .json({ message: "Staff created successfully", staff: newStaff });
  } catch (error) {
    console.error("Error creating staff:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// fetch staff
exports.getStaff = async (req, res) => {
  try {
    const { role } = req.query;
    let staff;
    if (role === "driver") {
      staff = await staffModel.findAll({
        where: { cid: req.cid, isDeleted: false, role: role },
      });
    } else if (role === "conductor") {
      staff = await staffModel.findAll({
        where: { cid: req.cid, isDeleted: false, role: role },
      });
    } else {
      staff = await staffModel.findAll({
        where: { cid: req.cid, isDeleted: false, role: role },
      });
    }
    res.status(200).json({ staff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete staff
exports.deleteStaff = async (req, res) => {
  try {
    const { staffId } = req.query;
    const deletedStaff = await staffModel.update(
      { isDeleted: true },
      { where: { id: staffId, cid: req.cid } }
    );
    if (deletedStaff[0] === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update staff
exports.updateStaff = async (req, res) => {
  try {
    const { id, name, nickName, mobile, role, address } = req.body;

    const [updatedRows] = await staffModel.update(
      {
        name,
        nickName,
        phone: mobile,
        role,
        address,
      },
      {
        where: { id: id, cid: req.cid },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const updatedStaff = await staffModel.findOne({
      where: { id: id, cid: req.cid },
    });

    res
      .status(200)
      .json({ message: "Staff updated successfully", staff: updatedStaff });
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// active or inactive staff
exports.activeStaff = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;

    const [updatedRows] = await staffModel.update(
      {
        status: status,
      },
      {
        where: { id: id, cid: req.cid, isDeleted: false },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Staff not found" });
    }

    const updatedStaff = await staffModel.findOne({
      where: { id: id, cid: req.cid, isDeleted: false },
    });

    res.status(200).json({
      message: `${updatedStaff.nickName} ${
        status === true ? "Activated" : "Deactivated"
      } successfully`,
      staff: updatedStaff,
    });
  } catch (error) {
    console.error("Error updating staff status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

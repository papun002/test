const staffModel = require("../../models/staff/staff.model");

exports.createStaff = async (req, res) => {
  try {
    const { name, nickName, phone, role, address, password } = req.body;

    // Check if staff with same mobile already exists
    const existingStaff = await staffModel.findOne({
      where: { phone: phone, cid: req.cid },
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
      phone: phone,
      role,
      address,
      cid: req.cid,
      password: password || null,
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

    const whereCondition = {
      cid: req.cid,
      isDeleted: false,
    };

    // Apply role filter only if provided
    if (role) {
      whereCondition.role = role;
    }

    const staff = await staffModel.findAll({
      where: whereCondition,
    });

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
    const { id, name, nickName, mobile, role, address, password } = req.body;
    const [updatedRows] = await staffModel.update(
      {
        name,
        nickName,
        phone: mobile,
        role,
        address,
        password,
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

exports.getStaffAllSummary = async (req, res) => {
  try {
    const { id, role } = req.query;

    if (!id) return res.status(400).json({ message: "Staff ID is required" });
    if (!role)
      return res
        .status(400)
        .json({ message: "Role is required (driver / conductor)" });

    /* ----------------------------------------
       1. Fetch staff details (driver/conductor)
    ---------------------------------------- */
    const staff = await staffModel.findOne({
      where: {
        id,
        cid: req.cid,
        role,
        isDeleted: false,
      },
      attributes: ["id", "name", "nickName", "role", "mobile"],
    });

    if (!staff) return res.status(404).json({ message: "Staff not found" });

    /* ----------------------------------------
       2. Select which column to filter by
          role="driver"     => driverId
          role="conductor"  => conductorId
    ---------------------------------------- */
    const staffTripField = role === "driver" ? "driverId" : "conductorId";

    /* ----------------------------------------
       3. Fetch all trips
    ---------------------------------------- */
    const allTrips = await FleetTripModel.findAll({
      where: {
        [staffTripField]: id,
        cid: req.cid,
        isDeleted: false,
        isCancel: false,
      },
      order: [["date", "DESC"]],
    });

    /* ----------------------------------------
       4. Calculate totals
    ---------------------------------------- */
    let summary = {
      totalTrips: allTrips.length,
      totalSale: 0,
      totalUpSale: 0,
      totalDownSale: 0,
      totalLuggage: 0,
      totalExpenditures: 0,
      totalBalance: 0,
      mainFuel: 0,
      fixedFuel: 0,
      busWorks: 0,
      partsAccessories: 0,
      mistriWorks: 0,
      otherExp: 0,
      fastTagTollAmt: 0,
      coolie: 0,
      stand: 0,
      staff: 0,
    };

    allTrips.forEach((t) => {
      summary.totalSale += Number(t.totalSale);
      summary.totalUpSale += Number(t.upTripSale);
      summary.totalDownSale += Number(t.downTripSale);
      summary.totalLuggage += Number(t.luggage);
      summary.totalExpenditures += Number(t.totalExpenditures);
      summary.totalBalance += Number(t.balance);

      summary.mainFuel += Number(t.mainFuel);
      summary.fixedFuel += Number(t.fixedFuel);
      summary.busWorks += Number(t.busWorks);
      summary.partsAccessories += Number(t.partsAccessories);
      summary.mistriWorks += Number(t.mistriWorks);
      summary.otherExp += Number(t.otherExp);
      summary.fastTagTollAmt += Number(t.fastTagTollAmt);
      summary.coolie += Number(t.coolie);
      summary.stand += Number(t.stand);
      summary.staff += Number(t.staff);
    });

    /* ----------------------------------------
       5. Monthly Summary (full breakdown)
    ---------------------------------------- */
    const monthlySummary = await FleetTripModel.findAll({
      where: {
        [staffTripField]: id,
        cid: req.cid,
        isDeleted: false,
        isCancel: false,
      },
      attributes: [
        [fn("DATE_FORMAT", col("date"), "%Y-%m"), "month"],

        // sales
        [fn("SUM", col("upTripSale")), "upTripSale"],
        [fn("SUM", col("downTripSale")), "downTripSale"],
        [fn("SUM", col("luggage")), "luggage"],
        [fn("SUM", col("totalSale")), "totalSale"],

        // expenditures
        [fn("SUM", col("mainFuel")), "mainFuel"],
        [fn("SUM", col("fixedFuel")), "fixedFuel"],
        [fn("SUM", col("busWorks")), "busWorks"],
        [fn("SUM", col("mistriWorks")), "mistriWorks"],
        [fn("SUM", col("partsAccessories")), "partsAccessories"],
        [fn("SUM", col("otherExp")), "otherExp"],
        [fn("SUM", col("fastTagTollAmt")), "fastTagTollAmt"],
        [fn("SUM", col("coolie")), "coolie"],
        [fn("SUM", col("stand")), "stand"],
        [fn("SUM", col("staff")), "staff"],
        [fn("SUM", col("totalExpenditures")), "totalExpenditures"],

        // balance
        [fn("SUM", col("balance")), "balance"],
      ],
      group: [literal("month")],
      order: [[literal("month"), "DESC"]],
    });

    /* ----------------------------------------
       6. Response
    ---------------------------------------- */
    return res.json({
      staff,
      summary,
      monthlySummary,
      trips: allTrips,
    });
  } catch (error) {
    console.log("Staff Summary Error:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getStaffByMobile = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required" });
    }

    const staff = await staffModel.findOne({
      where: { phone: mobile, cid: req.cid, isDeleted: false },
    });

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff found", staff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

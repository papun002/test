const RouteModel = require("../../models/route/route.model");
const { Op } = require("sequelize");
const FleetTripModel = require("../../models/trip/fleet-trip-details/Fleet-trip.model");
const {
  FuelTransactionModel,
  FuelStationModel,
} = require("../../models/index");

exports.CreateFuelStation = async (req, res) => {
  try {
    const { FuelStationName, address, mob, busRouteIds = [] } = req.body;

    console.log(busRouteIds);

    const fuelStation = await FuelStationModel.create({
      FuelStationName,
      address,
      mob,
      busRouteIds: busRouteIds.map(String),
      cid: req.cid,
    });

    return res.status(201).json({
      success: true,
      message: "Fuel station created successfully",
      data: fuelStation,
    });
  } catch (err) {
    console.log(err);
  }
};

// Get all Fuel Stations (excluding deleted)
exports.getAllFuelStations = async (req, res) => {
  try {
    console.log(FuelStationModel);
    const fuelStations = await FuelStationModel.findAll({
      where: { isDeleted: false, cid: req.cid },
    });
    console.log("Fuel" + fuelStations);

    // Map over stations to fetch route details
    const result = await Promise.all(
      fuelStations.map(async (station) => {
        const routeIds = station.busRouteIds || [];

        // Fetch route details from RouteModel
        const routes = await RouteModel.findAll({
          where: {
            id: { [Op.in]: routeIds },
          },
          attributes: ["id", "routeName"],
        });

        return {
          id: station.id,
          FuelStationName: station.FuelStationName,
          address: station.address,
          mob: station.mob,
          cid: station.cid,
          routes: routes, // array of {id, routeName}
        };
      })
    );
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- Get by ID --------------------
exports.getFuelStationById = async (req, res) => {
  try {
    const { id } = req.params;

    const station = await FuelStationModel.findOne({
      where: { id, isDeleted: false, cid: req.cid },
      include: [
        {
          model: RouteModel,
          as: "route", // same alias as in belongsTo
          attributes: ["id", "routeName"], // only the fields you need
        },
      ],
    });

    if (!station)
      return res
        .status(404)
        .json({ success: false, message: "Fuel station not found" });

    return res.status(200).json({ success: true, data: station });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- Update --------------------
exports.updateFuelStation = async (req, res) => {
  try {
    const { fuelStationId } = req.query;
    const { FuelStationName, address, mob, busId } = req.body;

    const station = await FuelStationModel.findOne({
      where: { id: fuelStationId, isDeleted: false, cid: req.cid },
    });

    if (!station)
      return res
        .status(404)
        .json({ success: false, message: "Fuel station not found" });

    await station.update({ FuelStationName, address, mob, busId });

    return res.status(200).json({ success: true, data: station });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- Soft Delete --------------------
exports.deleteFuelStation = async (req, res) => {
  try {
    const { fuelStationId } = req.query;
    const station = await FuelStationModel.findOne({
      where: { id: fuelStationId, isDeleted: false, cid: req.cid },
    });

    if (!station)
      return res
        .status(404)
        .json({ success: false, message: "Fuel station not found" });

    await station.update({ isDeleted: true });

    return res
      .status(200)
      .json({ success: true, message: "Fuel station deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVehiclePutsFuelStation = async (req, res) => {
  try {
    const { fuelStationId } = req.query;
    const { cid } = req;

    // 1️⃣ Get FuelStation by ID
    const station = await FuelStationModel.findOne({
      where: { id: fuelStationId, cid, isDeleted: false },
    });

    if (!station) {
      return res
        .status(404)
        .json({ success: false, message: "Fuel Station not found" });
    }

    const routeIds = station.busRouteIds || [];

    if (!routeIds.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No routes linked to this station",
      });
    }

    // 2️⃣ Get route names for these routeIds
    const routes = await RouteModel.findAll({
      where: { id: { [Op.in]: routeIds } },
      attributes: ["routeName"],
    });

    const routeNames = routes.map((r) => r.routeName);

    if (!routeNames.length) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No route names found" });
    }

    // 3️⃣ Get FleetTripDetails for these route names
    const tripData = await FleetTripModel.findAll({
      where: {
        routeName: { [Op.in]: routeNames },
        isDeleted: false,
        cid,
      },
      attributes: ["date", "routeName", "busNo", "mainFuel"],
      order: [["date", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: tripData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.CreateFuelTransaction = async (req, res) => {
  try {
    const { date, fuelStationId, amount } = req.body;
    console.log(req.body);

    const fuelTransaction = await FuelTransactionModel.create({
      date: date,
      fuelStationId,
      amountPaid: amount,
      cid: req.cid,
    });

    return res.status(201).json({
      success: true,
      message: "Fuel transaction created successfully",
      data: fuelTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllFuelTransactions = async (req, res) => {
  try {
    const fuelStationId = parseInt(req.query.fuelStationId);
    if (isNaN(fuelStationId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid fuelStationId" });
    }

    const fuelTransactions = await FuelTransactionModel.findAll({
      where: { fuelStationId, cid: req.cid, isDeleted: false },
      include: [
        {
          model: FuelStationModel,
          as: "fuelStation",
          attributes: ["FuelStationName"],
        },
      ],
      order: [["date", "DESC"]], // optional: sort by latest
    });

    return res.status(200).json({ success: true, data: fuelTransactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLatestFuelTransaction = async (req, res) => {
  try {
    const { fuelStationId } = req.query;

    const latestTransaction = await FuelTransactionModel.findOne({
      where: { FuelStationId: fuelStationId, cid: req.cid, isDeleted: false },
      order: [["Date", "DESC"]],
      limit: 1,
    });

    if (!latestTransaction) {
      return res.status(404).json({
        success: false,
        message: "No fuel transactions found for this station.",
      });
    }

    return res.status(200).json({ success: true, data: latestTransaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFuelDetailsSummaryOfFuelStation = async (req, res) => {
  try {
    const { fuelStationId } = req.query;
    const { cid } = req;

    // 1️⃣ Get FuelStation by ID
    const station = await FuelStationModel.findOne({
      where: { id: fuelStationId, cid, isDeleted: false },
    });

    if (!station) {
      return res
        .status(404)
        .json({ success: false, message: "Fuel Station not found" });
    }

    const routeIds = station.busRouteIds || [];

    if (!routeIds.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No routes linked to this station",
      });
    }

    // 2️⃣ Get route names for these routeIds
    const routes = await RouteModel.findAll({
      where: { id: { [Op.in]: routeIds } },
      attributes: ["routeName"],
    });

    const routeNames = routes.map((r) => r.routeName);

    if (!routeNames.length) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No route names found" });
    }

    // 3️⃣ Get FleetTripDetails for these route names
    const tripData = await FleetTripModel.findAll({
      where: {
        routeName: { [Op.in]: routeNames },
        isDeleted: false,
        cid,
      },
      attributes: ["id", "mainFuel"],
    });

    const totalMFuel = tripData.reduce(
      (sum, trip) => sum + parseFloat(trip.mainFuel),
      0
    );
    console.log("Total - " + totalMFuel);

    // 4️⃣ Fetch total paid amount from transactions (example: tripId or stationId)
    const tripIds = tripData.map((trip) => trip.id);

    const totalPaidData = await FuelTransactionModel.findAll({
      where: {
        isDeleted: false,
        cid,
      },
      attributes: ["amountPaid", "previosDue"], // adjust field name
    });

    const totalPaid = totalPaidData.reduce(
      (sum, tx) => sum + parseFloat(tx.amountPaid),
      0
    );
    console.log("total paid - " + totalPaidData);

    // 5️⃣ Calculate due
    const due = totalMFuel - totalPaid;
    return res.status(200).json({
      success: true,
      stationName: station,
      routes: routeNames,
      totalFuelCurrent: totalMFuel,
      totalFuel: totalMFuel + totalPaidData[0]?.previosDue - 93,
      totalPaid: totalPaid,
      totalDue: due + totalPaidData[0]?.previosDue,
      prevDue: totalPaidData[0]?.previosDue,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUpdateDuePrevious = async (req, res) => {
  try {
    const { fuelStationId, toDate, fromDate, amount } = req.body;
    const { cid } = req;

    if (!fuelStationId) {
      return res.status(400).json({ message: "fuelStationId is required" });
    }

    // ✅ Find the latest transaction for this station
    const latestTransaction = await FuelTransactionModel.findOne({
      where: { fuelStationId, isDeleted: false, cid },
      attributes: ["id", "previosDue", "date", "fuelStationId"],
      order: [["date", "DESC"]],
    });

    // ✅ CASE 1: No transaction found → create new one
    if (!latestTransaction) {
      const newTransaction = await FuelTransactionModel.create({
        fuelStationId,
        cid,
        previosDue: amount,
        fromDatePreviousDue: fromDate,
        toDatePreviousDue: toDate,
        mainFuel: 0, // optional defaults
        paid: 0,
        due: amount,
        date: new Date(),
        isDeleted: false,
      });

      return res.status(201).json({
        success: true,
        message:
          "No previous transaction found. New record created with previous due.",
        data: newTransaction,
      });
    }

    // ✅ CASE 2: If previous due already exists
    if (latestTransaction.previosDue && latestTransaction.previosDue > 0) {
      return res.status(200).json({
        success: false,
        message:
          "Previous due already exists for this station. No update performed.",
        data: latestTransaction,
      });
    }

    // ✅ CASE 3: Update previous due
    const [updatedCount] = await FuelTransactionModel.update(
      {
        previosDue: amount,
        fromDatePreviousDue: fromDate,
        toDatePreviousDue: toDate,
      },
      {
        where: {
          fuelStationId,
          isDeleted: false,
          cid,
          id: latestTransaction.id,
        },
      }
    );

    if (updatedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "No records were updated.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Previous due updated successfully.",
      data: updatedCount,
    });
  } catch (error) {
    console.error("Error in getUpdateDuePrevious:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getUpdateDuePrevious = async (req, res) => {
  try {
    const { fuelStationId, toDate, fromDate, amount } = req.body;
    const { cid } = req;

    if (!fuelStationId) {
      return res.status(400).json({ message: "fuelStationId is required" });
    }

    // ✅ Check for any transaction records for this station
    const existingTransaction = await FuelTransactionModel.findOne({
      where: { fuelStationId, isDeleted: false, cid },
      order: [["date", "DESC"]],
    });

    // ✅ CASE 1: No records exist → create a new one
    if (!existingTransaction) {
      const newTransaction = await FuelTransactionModel.create({
        fuelStationId,
        cid,
        previosDue: amount,
        fromDatePreviousDue: fromDate,
        toDatePreviousDue: toDate,
        date: new Date(), // you can change this to fromDate if needed
        isDeleted: false,
      });

      return res.status(201).json({
        success: true,
        message:
          "No previous transaction found. New record created with previous due.",
        data: newTransaction,
      });
    }

    // ✅ CASE 2: Transaction exists but already has previous due
    if (existingTransaction.previosDue && existingTransaction.previosDue > 0) {
      return res.status(200).json({
        success: false,
        message: "Previous due already exists. No update performed.",
        data: existingTransaction,
      });
    }

    // ✅ CASE 3: Transaction exists → update previous due
    const [updatedCount] = await FuelTransactionModel.update(
      {
        previosDue: amount,
        fromDatePreviousDue: fromDate,
        toDatePreviousDue: toDate,
      },
      {
        where: {
          id: existingTransaction.id,
          isDeleted: false,
          cid,
        },
      }
    );

    if (updatedCount === 0) {
      return res.status(400).json({
        success: false,
        message: "No records were updated.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Previous due updated successfully.",
      data: updatedCount,
    });
  } catch (error) {
    console.error("Error in getUpdateDuePrevious:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getRecentPreviousDue = async (req, res) => {
  try {
    const { fuelStationId } = req.query;
    const { cid } = req;

    if (!fuelStationId) {
      return res.status(400).json({ message: "fuelStationId is required" });
    }

    const latestTransactionWithPreviousDue = await FuelTransactionModel.findOne(
      {
        where: {
          fuelStationId,
          cid,
          isDeleted: false,
          previosDue: { [Op.ne]: null }, // Ensure previosDue is not null
        },
        order: [["date", "DESC"]],
        limit: 1,
        attributes: ["previosDue", "fromDatePreviousDue", "toDatePreviousDue"],
      }
    );

    if (!latestTransactionWithPreviousDue) {
      return res.status(200).json({
        success: true,
        message: "No previous due found for this fuel station.",
        data: {
          previosDue: 0,
          fromDatePreviousDue: null,
          toDatePreviousDue: null,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Latest previous due retrieved successfully.",
      data: latestTransactionWithPreviousDue,
    });
  } catch (error) {
    console.error("Error in getRecentPreviousDue:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getUpdateDueCurrent = async (req, res) => {};

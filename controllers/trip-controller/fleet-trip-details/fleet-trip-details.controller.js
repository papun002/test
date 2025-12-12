const FleetTripModel = require("../../../models/trip/fleet-trip-details/Fleet-trip.model");
const { route } = require("../../../route/trip-route/trip.route");
const Driver = require("../../../models/staff/staff.model");
const Conductor = require("../../../models/staff/staff.model");
const { Op, fn, col } = require("sequelize");
const moment = require("moment");
const staffModel = require("../../../models/staff/staff.model");
const routeModel = require("../../../models/route/route.model");

exports.CreateTripDetails = async (req, res) => {
  try {
    const data = req.body;

    // check same date and bus no is exists
    const existingTrip = await FleetTripModel.findOne({
      where: {
        date: data.date,
        routeName: data.routeName,
        routeId: data.routeId,
        cid: req.cid,
      },
    });

    if (existingTrip) {
      return res.status(400).json({
        success: false,
        message:
          "Trip with the same date and Route Name already exists or Cancel",
      });
    }

    const tripDetails = await FleetTripModel.create({
      routeName: data.routeName,
      date: data.date,
      routeId: data.routeId,
      busNo: data.busNo,
      upTripSale: data.upTripSale,
      downTripSale: data.downTripSale,
      luggage: data.luggage,
      totalSale: data.totalSale,
      mainFuel: data.mainFuel,
      fixedFuel: data.fixedFuel,
      coolie: data.coolie,
      staff: data.staff,
      fastTagTollAmt: data.fastTagTollAmt,
      partsAccessories: data.partsAccessories,
      mistriWorks: data.mistriWorks,
      busWorks: data.busWorks,
      otherExp: data.otherExp,
      totalExpenditures: data.totalExpenditures,
      balance: data.balance,
      driverId: data.driverId,
      conductorId: data.conductorId,
      mainFuelSameAsFixedFuel: data.mainFuelSameAsFixed,
      luggageAddWithTotalSale: data.luggageAddWithTotalSale,
      cid: req.cid,
    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      tripDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create trip",
      error: error.message,
    });
  }
};

exports.CancelTrips = async (req, res) => {
  try {
    const { routeId, date } = req.body;
    console.log(routeId, date);
    let tripDetails;

    const trip = await FleetTripModel.findOne({
      where: {
        routeId: routeId,
        date: date,
        cid: req.cid,
      },
    });

    const routeName = await routeModel.findOne({
      where: {
        id: routeId,
      },
    });

    console.log(trip);

    if (!trip) {
       tripDetails = await FleetTripModel.create({
        date: date,
        routeName: routeName.routeName,
        busNo: "",
        cid: req.cid, 
        routeId: routeId,
        cid: req.cid,
        isCancel: true,
      });
    } else {
      if (trip.isCancel === true) {
        return res.status(400).json({
          success: false,
          message: "Trip already cancelled",
        });
      }

      if (trip) {
        return res.status(404).json({
          success: false,
          message: "Trip found",
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Trip cancelled successfully",
      tripDetails,
    });
  } catch (error) {
    console.error("Error cancelling trip:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel trip",
      error: error.message,
    });
  }
};

exports.FetchTripDetails = async (req, res) => {
  try {
    const { routeId } = req.query;

    const tripDetails = await FleetTripModel.findAll({
      where: {
        cid: req.cid,
        isDeleted: false,
        routeId: routeId,
      },
      include: [
        {
          model: Driver,
          as: "driver",
          attributes: ["id", "nickName"],
        },
        {
          model: Conductor,
          as: "conductor",
          attributes: ["id", "nickName"],
        },
      ],
      order: [["date", "DESC"]],
    });

    res.status(200).json({
      success: true,
      tripDetails,
    });
  } catch (error) {
    console.error("Error fetching trip details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trip details",
      error: error.message,
    });
  }
};

// Fetch Latest 3 trip details
exports.FetchTripDetailsLatestThree = async (req, res) => {
  try {
    const routeName = req.query.routeName;

    const tripDetails = await FleetTripModel.findAll({
      where: {
        cid: req.cid,
        routeName: routeName,
        isDeleted: false,
      },
      include: [
        {
          model: Driver,
          as: "driver",
          attributes: ["id", "nickName"],
        },
        {
          model: Conductor,
          as: "conductor",
          attributes: ["id", "nickName"],
        },
      ],
      order: [["date", "DESC"]], // sort by latest
      limit: 3, // get only the latest 3 trips
    });

    res.status(200).json({
      success: true,
      tripDetails,
    });
  } catch (error) {
    console.error("Error fetching trip details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trip details",
      error: error.message,
    });
  }
};

// Fetch By Date
exports.FetchTripsByDate = async (req, res) => {
  try {
    const { routeName, date } = req.query;
    if (!date)
      return res
        .status(400)
        .json({ success: false, message: "Date is required" });

    const tripDetails = await FleetTripModel.findAll({
      where: {
        cid: req.cid,
        date: date,
        isDeleted: false,
        ...(routeName && { routeName }),
      },
      include: [
        { model: Driver, as: "driver", attributes: ["id", "nickName"] },
        { model: Conductor, as: "conductor", attributes: ["id", "nickName"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    console.log(tripDetails);

    res.status(200).json({ success: true, tripDetails });
  } catch (error) {
    console.error("Error fetching trips by date:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trips by date",
      error: error.message,
    });
  }
};

// Fetch by Month
exports.FetchTripsByMonth = async (req, res) => {
  try {
    const { routeName, month } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Month is required (format: YYYY-MM)",
      });
    }

    // Parse the month string: e.g. "2025-01"
    const [year, monthNum] = month.split("-").map(Number);
    if (!year || !monthNum || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        success: false,
        message: "Invalid month format. Use YYYY-MM (e.g. 2025-01)",
      });
    }

    // Build date range for the selected month
    const startOfMonth = new Date(year, monthNum - 1, 1);
    const endOfMonth = new Date(year, monthNum, 0, 23, 59, 59); // last day of the month

    // Fetch trips using the model's `date` field
    const tripDetails = await FleetTripModel.findAll({
      where: {
        cid: req.cid,
        ...(routeName && { routeName }),
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
        isDeleted: false,
      },
      include: [
        { model: Driver, as: "driver", attributes: ["id", "nickName"] },
        { model: Conductor, as: "conductor", attributes: ["id", "nickName"] },
      ],
      order: [["date", "ASC"]],
    });

    // Aggregate totals
    const summary = tripDetails.reduce(
      (acc, trip) => {
        acc.upTripSale += Number(trip.upTripSale || 0);
        acc.downTripSale += Number(trip.downTripSale || 0);
        acc.mainFuel += Number(trip.mainFuel || 0);
        acc.totalExpenditures += Number(trip.totalExpenditures || 0);
        acc.balance += Number(trip.balance || 0);
        return acc;
      },
      {
        upTripSale: 0,
        downTripSale: 0,
        mainFuel: 0,
        totalExpenditures: 0,
        balance: 0,
      }
    );

    res.status(200).json({
      success: true,
      month,
      totalTrips: tripDetails.length,
      tripDetails,
      summary,
    });
  } catch (error) {
    console.error("Error fetching trips by month:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trips by month",
      error: error.message,
    });
  }
};

// monthly Summary
exports.FetchTripMonthlySummary = async (req, res) => {
  try {
    const routeName = req.query.routeName;
    console.log(routeName);
    const today = moment().startOf("day");
    const firstDayCurrentMonth = moment().startOf("month");
    const firstDayLastMonth = moment().subtract(1, "month").startOf("month");
    const lastDayLastMonth = moment().subtract(1, "month").endOf("month");

    // Last Month Sale
    const lastMonthResult = await FleetTripModel.findAll({
      attributes: [[fn("SUM", col("balance")), "lastMonthSale"]],
      where: {
        date: {
          [Op.between]: [firstDayLastMonth.toDate(), lastDayLastMonth.toDate()],
        },
        isDeleted: false,
        ...(routeName && { routeName }),
      },
      raw: true,
    });

    const lastMonthSale = lastMonthResult[0].lastMonthSale
      ? parseFloat(lastMonthResult[0].lastMonthSale)
      : 0;

    // Current Month Sale
    const currentMonthResult = await FleetTripModel.findAll({
      attributes: [[fn("SUM", col("balance")), "currentMonthSale"]],
      where: {
        date: {
          [Op.gte]: firstDayCurrentMonth.toDate(),
        },
        isDeleted: false,
        ...(routeName && { routeName }),
      },
      raw: true,
    });

    const currentMonthSale = currentMonthResult[0].currentMonthSale
      ? parseFloat(currentMonthResult[0].currentMonthSale)
      : 0;

    // Today Sale
    const todayResult = await FleetTripModel.findAll({
      attributes: [[fn("SUM", col("balance")), "todaySale"]],
      where: {
        date: today.toDate(),
        isDeleted: false,
        ...(routeName && { routeName }),
      },
      raw: true,
    });

    const todaySale = todayResult[0].todaySale
      ? parseFloat(todayResult[0].todaySale)
      : 0;

    res.json({
      lastMonthSale,
      currentMonthSale,
      todaySale,
    });
  } catch (err) {
    console.error("Error fetching trip summary:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.RecentDateOfTripsByRouteId = async (req, res) => {
  try {
    const { routeId } = req.query;
    const recentDate = await FleetTripModel.findOne({
      where: {
        cid: req.cid,
        routeId: routeId,
        isDeleted: false,
      },
      order: [["date", "DESC"]],
      attributes: [
        [fn("MAX", col("date")), "recentDate"],
        [fn("COUNT", col("id")), "totalTrips"],
      ],
      raw: true,
    });
    res.status(200).json({
      success: true,
      recentDate,
    });
  } catch (error) {
    console.error;
  }
};

exports.deleteTrips = async (req, res) => {
  try {
    const { tripId } = req.query;

    // Check if trip exists
    const trip = await FleetTripModel.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // Check if already deleted
    if (trip.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Trip already deleted",
      });
    }

    // Soft delete
    trip.isDeleted = true;
    await trip.save();

    console.log(`Trip ${tripId} marked as deleted.`); // Log for auditing

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete trip",
      error: error.message,
    });
  }
};

exports.getTripsStaff = async (req, res) => {
  try {
    const { role } = req.query;
    let staff;
    if (role === "driver") {
      staff = await staffModel.findAll({
        where: { cid: req.cid, isDeleted: false, role: role, status: 1 },
      });
    } else if (role === "conductor") {
      staff = await staffModel.findAll({
        where: { cid: req.cid, isDeleted: false, role: role, status: 1 },
      });
    } else {
      staff = await staffModel.findAll({
        where: { cid: req.cid, isDeleted: false, role: role, status: 1 },
      });
    }
    res.status(200).json({ staff });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



exports.getTripsByConductorId = async (req, res) => {
  try {
    const sid = req.sid;
    const trips = await FleetTripModel.findAll({
      where: { conductorId: sid, isDeleted: false },
      order: [["date", "DESC"]],
      include: [
        {
          model: Driver,
          as: "driver",
          attributes: ["id", "nickName"],
        },
        {
          model: Conductor,
          as: "conductor",
          attributes: ["id", "nickName"],
        },
      ],
      LIMIT:5
    });
    res.status(200).json({ trips });
  } catch (error) {
    console.error("Error fetching trips by conductor ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createTripByConductorId = async (req, res) => {
  try {
    const data = req.body;
    const sid = req.sid;

    // check same date and bus no is exists
    const existingTrip = await FleetTripModel.findOne({
      where: {
        date: data.date,
        routeName: data.routeName,
        routeId: data.routeId,
        cid: req.cid,
        isDeleted: 0,
        conductorId: sid,
      },
    });

    if (existingTrip) {
      return res.status(400).json({
        success: false,
        message:
          "Trip with the same date and Route Name already exists or Cancel",
      });
    }

    const tripDetails = await FleetTripModel.create({
      routeName: data.routeName,
      date: data.date,
      routeId: data.routeId,
      busNo: data.busNo,
      upTripSale: data.upTripSale,
      downTripSale: data.downTripSale,
      luggage: data.luggage,
      amountJama: data.amountJama,
      totalSale: data.totalSale,
      mainFuel: data.mainFuel,
      fixedFuel: data.fixedFuel,
      coolie: data.coolie,
      staff: data.staff,
      fastTagTollAmt: data.fastTagTollAmt,
      partsAccessories: data.partsAccessories,
      mistriWorks: data.mistriWorks,
      busWorks: data.busWorks,
      otherExp: data.otherExp,
      totalExpenditures: data.totalExpenditures,
      balance: data.balance,
      driverId: data.driverId,
      conductorId: sid,
      mainFuelSameAsFixedFuel: data.mainFuelSameAsFixed,
      luggageAddWithTotalSale: data.luggageAddWithTotalSale,
      cid: req.cid,
      stand: data.stand,
    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      tripDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create trip",
      error: error.message,
    });
  }
};




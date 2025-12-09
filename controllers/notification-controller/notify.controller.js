const VehicleModel = require("../../models/vehicles/vehicleModel");
const RouteModel = require("../../models/route/route.model");
const FleetTripModel = require("../../models/trip/fleet-trip-details/Fleet-trip.model");
const { Op } = require("sequelize");

// Check if date is today
const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);

  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
};

// Check if date is within next N days
const isWithinDays = (date, days = 2) => {
  if (!date) return false;
  const today = new Date();
  const target = new Date(date);

  const diff = (target - today) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= days;
};

// Check if date is already expired (past)
const isExpired = (date) => {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date);

  return (
    d.getFullYear() < today.getFullYear() ||
    (d.getFullYear() === today.getFullYear() && d.getMonth() < today.getMonth()) ||
    (d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() < today.getDate())
  );
};

exports.getAllNotifications = async (req, res) => {
  try {
    const cid = req.cid || 0;
    const today = new Date();

    let notifications = [];

    // ---------------------
    // VEHICLE DOCUMENT EXPIRY NOTIFICATIONS
    // ---------------------
    const vehicles = await VehicleModel.findAll({
      where: { cid, isDeleted: false },
      attributes: [
        "id",
        "vehicleNumber",
        "ownerName",
        "insuranceUpto",
        "taxUpto",
        "fitnessUpto",
        "puccUpto",
      ],
    });

    vehicles.forEach((v) => {
      const vehicleNotifications = [];

      // INSURANCE
      if (isToday(v.insuranceUpto)) {
        vehicleNotifications.push("Insurance expires today");
      } else if (isExpired(v.insuranceUpto)) {
        vehicleNotifications.push("Insurance already expired");
      } else if (isWithinDays(v.insuranceUpto)) {
        vehicleNotifications.push("Insurance expiring soon");
      }

      // TAX
      if (isToday(v.taxUpto)) {
        vehicleNotifications.push("Tax expires today");
      } else if (isExpired(v.taxUpto)) {
        vehicleNotifications.push("Tax already expired");
      } else if (isWithinDays(v.taxUpto)) {
        vehicleNotifications.push("Tax expiring soon");
      }

      // FITNESS
      if (isToday(v.fitnessUpto)) {
        vehicleNotifications.push("Fitness expires today");
      } else if (isExpired(v.fitnessUpto)) {
        vehicleNotifications.push("Fitness already expired");
      } else if (isWithinDays(v.fitnessUpto)) {
        vehicleNotifications.push("Fitness expiring soon");
      }

      // PUCC
      if (isToday(v.puccUpto)) {
        vehicleNotifications.push("PUCC expires today");
      } else if (isExpired(v.puccUpto)) {
        vehicleNotifications.push("PUCC already expired");
      } else if (isWithinDays(v.puccUpto)) {
        vehicleNotifications.push("PUCC expiring soon");
      }

      if (vehicleNotifications.length > 0) {
        notifications.push({
          type: "vehicle",
          vehicleId: v.id,
          vehicleNumber: v.vehicleNumber,
          ownerName: v.ownerName,
          notifications: vehicleNotifications,
        });
      }
    });

    // ---------------------
    // DAILY TRIP NOTIFICATIONS
    // ---------------------
    const routes = await RouteModel.findAll({
      where: { cid, isDeleted: false, status: true },
      attributes: ["id", "routeName"],
    });

    const todayStr = today.toISOString().split("T")[0];

    const tripsToday = await FleetTripModel.findAll({
      where: { cid, date: todayStr, isDeleted: false },
      attributes: ["routeId"],
    });

    const addedRouteIds = tripsToday.map((t) => t.routeId);

    const pendingRoutes = routes.filter((r) => !addedRouteIds.includes(r.id));

    pendingRoutes.forEach((r) => {
      notifications.push({
        type: "trip",
        routeId: r.id,
        routeName: r.routeName,
      });
    });

    // ---------------------
    // RESPONSE
    // ---------------------
    return res.json({
      success: true,
      data: notifications,
      count: notifications.length,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching notifications",
    });
  }
};

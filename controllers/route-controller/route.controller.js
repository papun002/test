const RouteModel = require("../../models/route/route.model");
const FleetTripModel = require("../../models/trip/fleet-trip-details/Fleet-trip.model");

exports.createRoute = async (req, res) => {
  try {
    const { route, defaultVehicle } = req.body;

    // insert into db
    const newRoute = await RouteModel.create({
      routeName: route,
      defaultVehicle: defaultVehicle,
      cid: req.cid,
    });
    res.status(201).json({ newRoute, message: "Route created successfully" });

    // reset form fields
    req.body.route = "";
    req.body.defaultVehicle = "";
  } catch (error) {
    console.error("Error creating route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRoutes = async (req, res) => {
  try {
    const routes = await RouteModel.findAll({
      where: { cid: req.cid, isDeleted: false },
      attributes: [
        "id",
        "routeName",
        "defaultVehicle",
        [
          FleetTripModel.sequelize.literal(`(
            SELECT MAX(trips.date) 
            FROM tripFleetDetails AS trips
            WHERE trips.routeId = RouteModel.id
              AND trips.cid = ${req.cid}
              AND trips.isDeleted = false
          )`),
          "recentDate",
        ],
      ],
    });

    // Format the response
    const formattedRoutes = routes.map((route) => ({
      id: route.id,
      routeName: route.routeName,
      defaultVehicle: route.defaultVehicle,
      recentDate: route.dataValues.recentDate || null,
    }));

    res.status(200).json({ routes: formattedRoutes });
  } catch (error) {
    console.error("Error fetching routes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteRoute = async (req, res) => {
  try {
    const routeId = req.query.routeId;
    console.log(req);
    const deletedRoute = await RouteModel.update(
      { isDeleted: true },
      {
        where: { id: routeId, cid: req.cid },
      }
    );
    if (deletedRoute[0] === 0) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    console.error("Error deleting route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


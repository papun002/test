
// Load environment variables
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

const authRoutes = require("./route/auth.route");
const tripRoutes = require("./route/trip-route/trip.route");
const vehicleRoutes = require("./route/vehicle-route/vehicle.route");
const routeRoutes = require("./route/route-vehicle/route.vehicle");
const staffRoutes = require("./route/staff-route/staff.route");
const FuelRoutes = require("./route/fuel/fuel.route");
const dashboardRoutes = require("./route/dashboard/dashboard.route");
const recycleRoutes = require("./route/recycle/recycle.route");
const backupRoutes = require("./route/backup-route/backupRoutes");
const notifyRoutes = require("./route/notify/notify.route");
const busworkRoutes = require("./route/buswork/buswork.route");
const taskAssignRoutes = require("./route/taskAssign/taskAssign.route");
const locationRoutes = require("./route/location-route/location.route");

const { connectDB, sequelize } = require("./config/db");

const PORT = process.env.PORT || 4000;

/* =========================
   CREATE EXPRESS APP
========================= */
const app = express();

/* =========================
   CORS SETUP
========================= */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["*"];

app.use(
  cors({
    origin(origin, callback) {
      // allow all if *
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization",],
    credentials: true,
    noLoader: true,
  })
);

app.options("*", cors());

/* =========================
   SECURITY & PERFORMANCE
========================= */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("<h1>🚀 Kalinga Putra Group API running Version 1.0</h1>");
});

app.use("/api", authRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/fuel", FuelRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/recycle", recycleRoutes);
app.use("/api/backup", backupRoutes);
app.use("/api/notify", notifyRoutes);
app.use("/api/buswork", busworkRoutes);
app.use("/api/taskassign", taskAssignRoutes);
app.use("/api/location", locationRoutes);

/* =========================
   START SERVER
========================= */
async function startServer() {
  try {
    await connectDB();
    await sequelize.sync({ alter: false });
    console.log("🛢️ Database connected & synced");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err);
    process.exit(1);
  }
}

startServer();

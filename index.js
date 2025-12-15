// Load environment variables
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cluster = require("cluster");
const os = require("os");
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

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 4000;
const { connectDB, sequelize } = require("./config/db");

// Function that starts the express app
async function startServer() {
  const app = express();
  app.use(cors());

  // Security headers
  app.use(helmet());

  // Gzip compression
  app.use(compression());

  // Serve static files (cached for 1 day)
  app.use(express.static("public", { maxAge: "1d" }));

  // JSON parsing middleware
  await connectDB();

  await sequelize.sync({ alter: false });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  console.log(
    `🛢️  Database connected: ${process.env.DB_NAME} at ${process.env.DB_HOST}`
  );
  // Use routes
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

  // Basic route
  app.get("/", (req, res) => {
    res.send("🚀 Optimized Node Server is running smoothly!");
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} | PID: ${process.pid}`);
  });
}

// Cluster mode for multi-core usage
if (cluster.isMaster) {
  console.log(`🧠 Master ${process.pid} is running`);
  console.log(`⚡ Starting ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if one crashes
  cluster.on("exit", (worker, code, signal) => {
    console.log(`💀 Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  startServer();
}

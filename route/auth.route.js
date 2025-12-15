const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller/auth-controller");
const getCid = require("../middleware/getCid-middlware/getCid");

// Public Routes
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);
router.post("/staff/login", authController.staffLogin);

module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { ownerDashboard } = require("../controllers/ownerController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("owner"),
  ownerDashboard
);

module.exports = router;
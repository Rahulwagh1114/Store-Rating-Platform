const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboard,
  addUser,
  addStore,
  getUsers,
  getStores,
} = require("../controllers/adminController");

router.get("/dashboard", authMiddleware, roleMiddleware("admin"), getDashboard);

router.post("/users", authMiddleware, roleMiddleware("admin"), addUser);

router.post("/stores", authMiddleware, roleMiddleware("admin"), addStore);

router.get("/users", authMiddleware, roleMiddleware("admin"), getUsers);

router.get("/stores", authMiddleware, roleMiddleware("admin"), getStores);

module.exports = router;
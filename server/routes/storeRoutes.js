const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getAllStores } = require("../controllers/storeController");

router.get("/", authMiddleware, getAllStores);

module.exports = router;
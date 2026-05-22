const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");

const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json({
      message: "User added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, imageUrl, ownerId } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      imageUrl,
      ownerId,
    });

    res.status(201).json({
      message: "Store added successfully",
      store,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role"],
      order: [["name", "ASC"]],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "imageUrl",
        [
          Sequelize.literal(
            "(SELECT AVG(rating) FROM Ratings WHERE Ratings.storeId = Store.id)"
          ),
          "averageRating",
        ],
      ],
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
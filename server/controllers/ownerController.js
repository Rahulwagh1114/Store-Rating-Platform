const { Sequelize } = require("sequelize");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const User = require("../models/User");

exports.ownerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found for this owner",
      });
    }

    const ratings = await Rating.findAll({
      where: {
        storeId: store.id,
      },
    });

    const usersWithRatings = await Promise.all(
      ratings.map(async (item) => {
        const user = await User.findByPk(item.userId);

        return {
          userName: user.name,
          userEmail: user.email,
          rating: item.rating,
        };
      })
    );

    const averageRating = await Rating.findOne({
      where: { storeId: store.id },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"]],
    });

    res.json({
      store,
      averageRating: averageRating.dataValues.avgRating || 0,
      ratings: usersWithRatings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
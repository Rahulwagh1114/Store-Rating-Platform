const Store = require("../models/Store");
const Rating = require("../models/Rating");

exports.getAllStores = async (req, res) => {
  try {
    const search = req.query.search || "";

    const allStores = await Store.findAll();

    const stores = allStores.filter((store) => {
      return (
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.address.toLowerCase().includes(search.toLowerCase())
      );
    });

    const result = [];

    for (let store of stores) {
      const ratings = await Rating.findAll({
        where: { storeId: store.id },
      });

      let averageRating = 0;

      if (ratings.length > 0) {
        const total = ratings.reduce((sum, r) => sum + r.rating, 0);
        averageRating = total / ratings.length;
      }

      const userRating = await Rating.findOne({
        where: {
          storeId: store.id,
          userId: req.user.id,
        },
      });

      result.push({
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        imageUrl: store.imageUrl,
        averageRating,
        userRating: userRating ? userRating.rating : null,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
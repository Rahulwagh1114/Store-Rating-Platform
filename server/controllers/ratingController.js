const Rating = require("../models/Rating");

exports.submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId,
      },
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();

      return res.json({
        message: "Rating updated successfully",
      });
    }

    await Rating.create({
      userId: req.user.id,
      storeId,
      rating,
    });

    res.status(201).json({
      message: "Rating submitted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
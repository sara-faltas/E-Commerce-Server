const router = require("express").Router();

const Review = require("../models/Review.model");

// POST "/api/user/review" => creates the review comment
router.post("/review", async (req, res, next) => {
  // review ,productId
  console.log(req.body);
  const { reviewText, product } = req.body;

  // review are mandatory
  if (!reviewText) {
    res.status(400).json({ errorMessage: "You need to enter your review" });
    return; // this means, stop executing the route
  }

  try {
    const newreviewText = {
      reviewText: reviewText,
      product: product,
    };
    const response = await Review.create(newreviewText);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const router = require("express").Router();
const Review = require("../models/Review.model");
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")


// POST "/api/review/create" => creates the review comment
router.post("/create", verifyToken, async (req, res, next) => {
  console.log(req.body);
  const { reviewText, product,user } = req.body;

  // review are mandatory
  if (!reviewText) {
    res.status(400).json({ errorMessage: "You need to enter your review" });
    return; // this means, stop executing the route
  }

  try {
    const newreviewText = {
      reviewText: reviewText,
      product: product,
      user:user
    };
    const response = await Review.create(newreviewText);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});


// Patch "/api/review/update/:reviewId" => updates the review
router.patch("/update/:reviewId",verifyToken, async (req, res, next) => {
 const { reviewText, product,user } = req.body;
  try {
   const updatedreview = {
    reviewText: reviewText
    }
    const response = await Review.findByIdAndUpdate(
      req.params.reviewId,
      updatedreview,
      { new: true },
    );
    res.status(200).json(response);
    console.log("review updated");
  } catch (error) {
    next(error)
  }
});

// delete "/api/review/delete/reviewId" => delete the review
router.delete("/delete/:reviewId", verifyToken, async (req, res, next)  => {
  try {
    const response = await Review.findByIdAndDelete(req.params.reviewId);
    res.sendStatus(200);
    console.log("review deleted");
  } catch (error) {
    next(error)
  }
});

// GET "/api/review" => get all reviews
router.get("/", async (req, res, next) => {
  try {
    const response = await Review.find();
    console.log("Retrieved review list ->", response);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});

// GET "/api/review/:reviewId" => get the review of the product
router.get("/:reviewId", async (req, res, next) => {
  try {
    const response = await Review.findById(req.params.reviewId).populate("product");
    console.log("Retrieved review ->", response);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});


module.exports = router;

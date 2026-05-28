const router = require("express").Router();
const User = require("../models/User.model");
const Review = require("../models/Review.model")
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")


//Get "/api/user/reviews" => all all reviews for this user
router.get("/reviews", verifyToken ,async (req, res, next) => {
  try {
    const reviews = await Review.find({
      user: (req.payload._id)
    })
      .populate("product")
      .populate("user");

    res.status(200).json(reviews);

  } catch (error) {
    next(error);
  }
});


// GET "/api/user/:userId" => get user by id
router.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});






module.exports = router;
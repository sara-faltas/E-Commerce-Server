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

// GET "/api/user/all" => get all users in the DB
router.get("/all", verifyToken,verifyAdmin, async (req, res, next) => {
    try {
        const response = await User.find();
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});

// Update "/api/user/update" => get user by id
router.patch("/update", verifyToken, async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body
         const updateduser = {
         firstName: firstName,
         lastName: lastName,
         email: email,
         password: password 
        }
        const response = await User.findByIdandUpdate(req.payload._id,updateduser ,{ new: true },);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});






module.exports = router;
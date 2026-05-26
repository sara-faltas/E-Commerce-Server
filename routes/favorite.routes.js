const router = require("express").Router();
const User = require("../models/User.model");
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")


// GET "/api/favorite/:userId" => get all products inside favorite
router.get("/:userId", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.userId).populate({
      path: "favorite",
      populate: {
        path: "product"
  }});
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});




module.exports = router;

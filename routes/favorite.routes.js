const router = require("express").Router();
const User = require("../models/User.model");
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")



// GET "/api/favorite/" => get all products inside favorite
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id).select("favorite").populate("favorite");
    res.status(200).json(response.favorite);
  } catch (error) {
    next(error)
  }
});


// PUT "api/favorite/:productId => add and remove product from favorite 
router.put("/:productId",verifyToken, async (req, res, next) => {
    try {
      const { productId } = req.params;
      // logged in user id from token
      const userId = req.payload._id;
      const user = await User.findById(userId);
      const isFavorite = user.favorite.some(
        (fav) => fav.toString() === productId
      );
      if (isFavorite) {
        // REMOVE
        user.favorite = user.favorite.filter(
          (fav) => fav.toString() !== productId
        );
      } else {
        // ADD
        user.favorite.push(productId);
      }
      await user.save();
      res.status(200).json(user.favorite);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;

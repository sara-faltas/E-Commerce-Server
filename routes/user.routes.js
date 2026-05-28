const router = require("express").Router();
const User = require("../models/User.model");
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")

// GET "/api/user/:userId" => get user by id
router.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});

// GET "/api/user/:userId" => get user by id
router.get("/:userId", verifyToken, async (req, res, next) => {
    try {
        const response = await User.findById(req.params.userId);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
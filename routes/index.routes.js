const router = require("express").Router();

// ℹ️ Organize and connect all your route files here.
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const loggedUserRoutes = require("./review.routes")
router.use("/review", loggedUserRoutes)

const adminRoutes = require("./product.routes")
router.use("/product", adminRoutes)

const favoriteRoutes = require("./favorite.routes")
router.use("/favorite", favoriteRoutes)

const cartRoutes = require("./cart.routes")
router.use("/cart", cartRoutes)



module.exports = router;
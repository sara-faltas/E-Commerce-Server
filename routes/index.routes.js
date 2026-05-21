const router = require("express").Router();

// ℹ️ Organize and connect all your route files here.
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const loggedUserRoutes = require("./review.routes")
router.use("/user", loggedUserRoutes)

const adminRoutes = require("./product.routes")
router.use("/admin", adminRoutes)



module.exports = router;
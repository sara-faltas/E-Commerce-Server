const jwt = require("jsonwebtoken");

// a middleware that checks if the token is valid, then allows the client to continue with a private route
function verifyToken(req, res, next) {
  try {
    console.log(req.headers);
    const authToken = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);
    // if the verify works, it means that the token is valid and has not expired.
    req.payload = payload; // sends information of the user making the request into the route.
    next(); // continue with the route
  } catch (error) {
    // if the verify tried to crash then it means one of 3 possibilities:
    // 1. the token doesn't exist
    // 2. the token has expired
    // 3. if the token has been tampered with
    res.status(401).json({ errorMessage: "Token not provided or not valid" });
  }
}

function verifyAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    next();
  } else {
    res
      .status(401)
      .json({
        errorMessage: "You are not an admin. This route is only for admins",
      });
  }
}



module.exports = {
  verifyToken,
  verifyAdmin,
};

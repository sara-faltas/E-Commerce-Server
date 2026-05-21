const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken") 
const { verifyToken } = require("../middlewares/auth.middlewares")
const { verifyAdmin } = require("../middlewares/auth.middlewares")


// POST "/api/auth/signup" => creates the user document
router.post("/signup", async (req, res, next) => {
  console.log(req.body)
  
  const { email, firstName,lastName, password } = req.body
  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({errorMessage: "email,password,first name and last name are mandatory"})
    return 
  }
  
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if (passwordRegex.test(password) === false) {
    res.status(400).json({errorMessage: "Password is not strong enough. It needs at least 8 characters, one uppercase, one lowercase and one number"})
    return 
  }
  
  try {
    // email should be unique
    const foundUser = await User.findOne({ email: email }) // either the user or null
    if (foundUser) {
      res.status(400).json({errorMessage: "user already created with that email"})
      return 
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword
    }

    const response = await User.create(newUser)

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// POST "/api/auth/login" => receiving credentials from the user, authenticating them and sending the token
router.post("/login", async (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body
    if (!email || !password) {
    res.status(400).json({ errorMessage: "Both email and password are mandatory" })
    return 
  }

  try {
    
    // the email needs to be in the DB
    const foundUser = await User.findOne({ email: email }) 
    console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({errorMessage: "user not found with that email, please signup first"})
      return 
    }

    // the password should match
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password)
    if (!isPasswordMatch) {
      res.status(400).json({errorMessage: "the password is not correct"})
      return // this means, stop executing the route
    }

    // we will have authenticated the user and we can create that token...
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      // this if for the admin role 
      role: foundUser.role
    }

    const tokenConfig = {
      expiresIn: "7d"
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig)

    res.status(200).json({ authToken, payload })

  } catch (error) {
    next(error)
  }
})

// GET "/api/auth/verify" => Only for frontend purposes. So the frontend know who the owner of the token is.
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({ payload: req.payload })
})


// GET "/api/auth/verifyAdmin" => Only for frontend purposes. So the frontend know who the owner of the token is.
router.get("/verifyAdmin", verifyAdmin , (req, res) => {
  res.status(200).json({ payload: req.payload })
})

module.exports = router;
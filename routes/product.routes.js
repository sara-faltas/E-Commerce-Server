const router = require("express").Router();

const { title } = require("node:process");
const product = require("../models/Product.model")


// POST "/api/admin/product" => creates the product
router.post("/product", async (req, res, next) => {


  console.log(req.body)
  const {   title,  description,  price,   category, size,image,  stock } = req.body

  // are mandatory
  if (!title || !price ) {
    res.status(400).json({errorMessage: "You need to enter your review"})
    return // this means, stop executing the route
  }
  
  try {
    
    //... create the review
    const newProduct = {
    title: title,
    description: description,
      price: price,
       category: category,
       size:size,
     image:image,
     stock: stock
  
    }

    const response = await Product.create(newProduct)

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})



module.exports = router;
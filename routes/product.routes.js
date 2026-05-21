const router = require("express").Router();
const { title } = require("node:process");
const Product = require("../models/Product.model")
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")


// POST "/api/admin/product" => creates the product
router.post("/product", verifyAdmin, async (req, res, next) => {


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

// Patch "/api/admin/product/productId" => updates the product
router.patch("/product/:productId",verifyAdmin, async (req, res, next) => {
  try {

 const {   title,  description,  price,   category, size,image,  stock } = req.body
   const updatedProduct = {
    title: title,
    description: description,
      price: price,
       category: category,
       size:size,
     image:image,
     stock: stock
  
    }
    const response = await Product.findByIdAndUpdate(
      req.params.productId,
      updatedProduct,
      { new: true },
    );
    res.status(200).json(response);
    console.log("product updated");
  } catch (error) {
    next(error)
  }
});

// delete "/api/admin/product/productId" => delete the product
router.delete("/product/:productId", verifyAdmin, async (req, res, next)  => {
  try {
    const response = await Product.findByIdAndDelete(req.params.productId);
    res.sendStatus(200);
    console.log("product deleted");
  } catch (error) {
    next(error)
  }
});

// GET "/api/admin/product" => get the product list
router.get("/products", async (req, res, next) => {

  try {
    const response = await Product.find();
    console.log("Retrieved products ->", response);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});

// GET "/api/admin/product/productId" => get the product details
router.get("/product/:productId", async (req, res, next) => {
  try {
    const response = await Product.findById(req.params.productId);
    console.log("Retrieved products detail ->", response);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});



module.exports = router;
const router = require("express").Router();
const { title } = require("node:process");
const Product = require("../models/Product.model")
const {verifyToken, verifyAdmin } = require ("../middlewares/auth.middlewares")


// POST "/api/product/create" => creates the product
router.post("/create", verifyToken,verifyAdmin, async (req, res, next) => {


  console.log(req.body)
  const {   title,  description,  price,   category, size,image,  stock ,edition} = req.body

  // are mandatory
  if (!title || !price ) {
    res.status(400).json({errorMessage: "You need to enter your title and price"})
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
     stock: stock,
     edition:edition
  
    }

    const response = await Product.create(newProduct)

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// Patch "/api/product/update/:productId" => updates the product
router.patch("/update/:productId",verifyToken,verifyAdmin, async (req, res, next) => {
  try {

 const {   title,  description,  price,   category, size,image,  stock,edition } = req.body
   const updatedProduct = {
    title: title,
    description: description,
      price: price,
       category: category,
       size:size,
     image:image,
     stock: stock,
     edition:edition
  
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

// delete "/api/product/delete/:productId" => delete the product
router.delete("/delete/:productId", verifyToken,verifyAdmin, async (req, res, next)  => {
  try {
    const response = await Product.findByIdAndDelete(req.params.productId);
    res.sendStatus(200);
    console.log("product deleted");
  } catch (error) {
    next(error)
  }
});

// GET "/api/product" => get the product list
router.get("/", async (req, res, next) => {

  try {
    const response = await Product.find();
    console.log("Retrieved products ->", response);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});

// GET "/api/product/productId" => get the product details
router.get("/:productId", async (req, res, next) => {
  try {
    const response = await Product.findById(req.params.productId);
    console.log("Retrieved products detail ->", response);
    res.status(200).json(response);
  } catch (error) {
    next(error)
  }
});



module.exports = router;
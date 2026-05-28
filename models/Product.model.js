const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
 
    title: {
      type: String,
      required: [true, 'title is required.']
    },
    description: {
      type: String,
    },
      price: {
      type: Number,
      required: [true, 'Price is required.']
    },
       category: {
      type: String
    },

       size: {
      type: String
    },
    material: {
      type: String,
      default:"cotton"
    },
     stock: {
      type: Number
    },
    image: String,
    edition: {
      type:String,
      default:"normal"},
  
    // this second object adds extra properties: `createdAt` and `updatedAt`    
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
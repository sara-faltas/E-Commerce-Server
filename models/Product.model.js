const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
 
    title: {
      type: String,
      required: [true, 'title is required.'],
      lowercase: true
    },
    description: {
      type: String,
    },
      price: {
      type: Number,
      required: [true, 'Price is required.'],
      trim:true
    },
       category: {
      type: String,
      enum:["Handmade","Backpack","Side Bag"]
    },

       size: {
      type: String,
      required: [true, 'size is required.']
    },
     image: {
      type: String
    },
     stock: {
      type: Number
    },
    
  
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
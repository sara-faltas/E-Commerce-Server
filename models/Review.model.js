const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: [true, 'Review is required.']
    },
    rating: Number,
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    },
     user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
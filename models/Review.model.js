const { ObjectId } = require("bson");
const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    reviewText: {
      type: String,
      required: [true, 'Review is required.']
    },
    product:{
      type:ObjectId,
      ref:"Product"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
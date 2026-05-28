const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    firstName: {
      type: String,
      required: [true, "first name is required."],
    },
    lastName: {
      type: String,
      required: [true, "last name is required."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    favorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;

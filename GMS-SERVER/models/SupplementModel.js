const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplementSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Pre", "Intra", "Post"],
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    flavor: {
      type: String,
      trim: true,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplement", supplementSchema);

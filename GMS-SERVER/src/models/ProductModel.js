const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Pre", "Intra", "Post", "Protein", "Amino Acids", "Multivitamins", "Minerals", "Other"],
      default: "Other"
    },
    brand: {
      type: String,
      trim: true,
      maxlength: [50, "Brand name cannot exceed 50 characters"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },
    mrp: {
      type: Number,
      min: [0, "MRP cannot be negative"]
    },
    image: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0
    },
    reviews: {
      type: Number,
      min: [0, "Reviews cannot be negative"],
      default: 0
    },
    flavor: {
      type: String,
      trim: true,
      maxlength: [50, "Flavor name cannot exceed 50 characters"]
    },
    servings: {
      type: Number,
      min: [1, "Servings must be at least 1"]
    },
    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
      default: 0
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    tags: [{
      type: String,
      trim: true
    }],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Virtual for discount percentage
productSchema.virtual("discountPercent").get(function () {
  if (this.mrp && this.mrp > this.price) {
    return Math.round(((this.mrp - this.price) / this.mrp) * 100);
  }
  return 0;
});

// Virtual for final price (considering any future discounts)
productSchema.virtual("finalPrice").get(function () {
  return this.price;
});

module.exports = mongoose.model("Product", productSchema);

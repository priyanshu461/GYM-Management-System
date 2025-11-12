// backend/models/CustomerModel.js
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // only 10-digit numbers allowed
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "", // ✅ important (instead of null)
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    height: {
      type: Number, // in centimeters
      default: null,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

// ✅ Unique index only if email is non-empty
customerSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $ne: "" } } }
);

module.exports = mongoose.model("Customer", customerSchema);

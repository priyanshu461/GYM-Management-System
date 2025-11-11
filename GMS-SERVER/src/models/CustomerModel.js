// models/Customer.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Customer Schema
const customerSchema = new Schema(
  {
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    aadharNo: {
      type: String,
      required: [true, "Aadhar number is required"],
      unique: true,
      match: [/^[0-9]{12}$/, "Aadhar number must be 12 digits"],
    },
    address: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String, // Can store URL or file path
      default: "",
    },
    emergencyContact: {
      type: String,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit contact number"],
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    occupation: {
      type: String,
      trim: true,
    },
    // Optional: track if customer is active or deleted
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    versionKey: false, // Removes "__v" field
  }
);

// Optional: virtual field for full info
customerSchema.virtual("fullInfo").get(function () {
  return `${this.name} (${this.mobile})`;
});

// Export Model
module.exports = mongoose.model("Customer", customerSchema);

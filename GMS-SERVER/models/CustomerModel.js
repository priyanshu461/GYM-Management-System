const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    addharNo: { type: String, required: true },
    address: { type: String },
    profileImage: { type: String },
    emergencyContact: { type: String },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    occupation: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", customerSchema);

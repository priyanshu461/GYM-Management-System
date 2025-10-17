const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    address: { type: String },
    image: { type: String },
    profile: {
      dob: { type: Date },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      exp: { type: String },
      aadharNo: { type: String },
      emergencyContact: { type: String },
      spacialization: { type: String },
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // name of the referenced model
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

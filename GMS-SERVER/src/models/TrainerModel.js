const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainerSchema = new Schema(
  {
    employeeId: { type: String, unique: true },
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    address: { type: String },
    image: { type: String },
    certifications: [{ type: String }],
    specializations: [{ type: String }],
    rating: { type: Number, default: 0 },
    profile: {
      dob: { type: Date },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      exp: { type: String },
      aadharNo: { type: String },
      emergencyContact: { type: String },
      spacialization: { type: String },
      occupation: { type: String },
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);

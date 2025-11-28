const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: "Gym" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    employeeId: { type: String },
    mobile: { type: String },
    address: { type: String },
    image: { type: String },
    user_type: {
      type: String,
      enum: ["Admin", "Gym", "Trainer", "Staff", "Member"],
      required: true,
    },
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
      salary: { type: Number, default: 25000 }, // Default salary for trainers
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role", // name of the referenced model
    },
    assignedTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Trainer (User with user_type: "Trainer")
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

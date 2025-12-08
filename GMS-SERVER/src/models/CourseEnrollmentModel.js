const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseEnrollmentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    plan: {
      type: String,
      enum: ["monthly", "annual"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi"],
      required: true,
    },
    paymentDetails: {
      cardNumber: { type: String },
      expiry: { type: String },
      cvv: { type: String },
      name: { type: String },
      upiId: { type: String },
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CourseEnrollment", courseEnrollmentSchema);

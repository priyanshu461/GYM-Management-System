// models/Payment.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Payment Schema
const paymentSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer reference is required"],
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    method: {
      type: String,
      enum: ["Cash", "Card", "Online", "Cheque"],required: [true, "Payment method is required"],
    },
    transactionId: {
      type: String,trim: true,unique: true,sparse: true,
    },
    invoiceNo: {
      type: String,trim: true,unique: true,sparse: true,
    },
    date: {
      type: Date,required: true,default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Completed",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [300, "Notes cannot exceed 300 characters"],
    },
    receipt: {
      type: String, default: "",
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);

paymentSchema.pre("save", function (next) {
  if (!this.invoiceNo) {
    this.invoiceNo = "INV-" + Date.now();
  }
  next();
});

paymentSchema.virtual("summary").get(function () {
  return `${this.method} payment of ₹${this.amount} - ${this.status}`;
});

module.exports = mongoose.model("Payment", paymentSchema);

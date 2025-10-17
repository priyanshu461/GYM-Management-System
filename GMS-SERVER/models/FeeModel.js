// models/Fee.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Fee Schema
const feeSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,ref: "Customer",required: [true, "Customer reference is required"],
    },
    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [3, "Description must be at least 3 characters long"],
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    dueDate: {
      type: Date,required: [true, "Due date is required"],
    },
    paidDate: {
      type: Date,
    },
    status: {
      type: String,enum: ["Pending", "Paid", "Overdue"],default: "Pending",
    },
    paymentMethod: {
      type: String,enum: ["Cash", "Card", "UPI", "Bank Transfer", "Other"],default: "Cash",
    },
    invoiceNo: {
      type: String,unique: true,sparse: true,trim: true,
    },
    remarks: {
      type: String,trim: true,default: "",
    },
    receipt: {
      type: String,default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false, 
  }
);

feeSchema.virtual("summary").get(function () {
  return `${this.description} - ₹${this.amount} (${this.status})`;
});

module.exports = mongoose.model("Fee", feeSchema);

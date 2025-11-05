// models/Expense.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Expense Schema
const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [3, "Description must be at least 3 characters long"],
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    date: {
      type: Date,required: true,default: Date.now,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,ref: "Category",required: [true, "Category is required"],
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,ref: "User",required: false, 
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer", "Other"],default: "Cash",
    },
    receipt: {
      type: String, default: "",
    },
    notes: {
      type: String,trim: true,default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);

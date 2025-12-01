const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Salary", "Equipment", "Maintenance", "Utilities", "Membership", "Training", "Other"],
      default: "Other",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    salaryBreakdown: {
      baseSalary: {
        type: Number,
        default: 0,
        min: 0,
      },
      performanceBonus: {
        type: Number,
        default: 0,
        min: 0,
      },
      clientCommissions: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    gym: {
      type: String,
      required: false,
    },
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: false,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Completed",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for better query performance
transactionSchema.index({ date: -1 });
transactionSchema.index({ gym: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ category: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);

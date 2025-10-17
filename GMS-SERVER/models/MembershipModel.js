// models/Membership.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Membership Schema
const membershipSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer reference is required"],
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plans",required: [true, "Plan reference is required"],
    },
    startDate: {
      type: Date,
      required: true,default: Date.now,
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Cancelled"],default: "Active",
    },
    paymentHistory: [
      {
        payment: {
          type: mongoose.Schema.Types.ObjectId,ref: "Payment",
        },
        date: {
          type: Date,default: Date.now,
        },
      },
    ],
    autoRenew: {
      type: Boolean,default: false,
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

membershipSchema.pre("save", function (next) {
  if (this.endDate < new Date() && this.status === "Active") {
    this.status = "Expired";
  }
  next();
});
module.exports = mongoose.model("Membership", membershipSchema);

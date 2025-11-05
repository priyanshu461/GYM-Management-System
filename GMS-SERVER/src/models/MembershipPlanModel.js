const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membershipPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);

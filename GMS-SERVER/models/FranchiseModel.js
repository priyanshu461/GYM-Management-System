const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const franchiseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    investment: {
      type: String,
      required: true,
    },
    roi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Franchise", franchiseSchema);

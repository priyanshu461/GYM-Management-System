const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    usage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Facility", facilitiesSchema);

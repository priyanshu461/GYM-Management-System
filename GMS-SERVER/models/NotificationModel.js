// models/Notification.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Notification Schema
const notificationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    type: {
      type: String,
      enum: ["Info", "Warning", "Error", "Success", "Activity"],default: "Info",
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["normal", "high", "urgent"],default: "normal",
    },
    link: {
      type: String,default: "",trim: true,
    },
    channels: [{
      type: String,
      enum: ["email", "sms", "push", "inapp"],
    }],
    segment: {
      type: String,
      enum: ["all", "new", "inactive", "trial", "vip"],default: "all",
    },
    schedule: {
      type: Date,
    },
    template: {
      type: String,default: "",trim: true,
    },
    campaign: {
      type: String,default: "",trim: true,
    },
    sentAt: {
      type: Date,
    },
    openedAt: {
      type: Date,
    },
    clickedAt: {
      type: Date,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);

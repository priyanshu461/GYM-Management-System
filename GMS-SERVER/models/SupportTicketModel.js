const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Reply sub-schema
const replySchema = new Schema({
  author: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Support Ticket Schema
const supportTicketSchema = new Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    member: {
      type: String,
      trim: true,
      default: ""
    },
    club: {
      type: String,
      trim: true,
      default: "Online"
    },
    priority: {
      type: String,
      enum: ["Urgent", "High", "Medium", "Low"],
      default: "Medium"
    },
    status: {
      type: String,
      enum: ["Open", "Pending", "Resolved"],
      default: "Open"
    },
    category: {
      type: String,
      enum: ["Billing", "App", "Facilities", "Training"],
      default: "App"
    },
    assignee: {
      type: String,
      trim: true,
      default: ""
    },
    replies: [replySchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Auto-generate ticketId before saving
supportTicketSchema.pre('save', async function(next) {
  if (this.isNew && !this.ticketId) {
    const count = await mongoose.model('SupportTicket').countDocuments();
    this.ticketId = `GB-${(1000 + count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);

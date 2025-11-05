const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        profile: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
            role: { type: String, enum: ["Admin", "Manager", "Trainer", "Support"], default: "Admin" },
            bio: { type: String }
        },
        security: {
            otpEnabled: { type: Boolean, default: false },
            sessions: [{
                device: { type: String },
                ip: { type: String },
                lastActive: { type: Date, default: Date.now }
            }]
        },
        notifications: {
            memberUpdates: {
                classReminders: { type: Boolean, default: true },
                newSignups: { type: Boolean, default: true },
                ptBookingAlerts: { type: Boolean, default: true },
                lowAttendance: { type: Boolean, default: true },
                missedPayments: { type: Boolean, default: true },
                weeklySummary: { type: Boolean, default: true }
            },
            channels: {
                email: { type: Boolean, default: true },
                sms: { type: Boolean, default: true },
                push: { type: Boolean, default: true },
                inApp: { type: Boolean, default: true }
            }
        },
        appearance: {
            theme: { type: String, enum: ["emerald", "cyan", "indigo", "rose"], default: "emerald" },
            density: { type: String, enum: ["comfortable", "compact"], default: "comfortable" }
        },
        branches: [{
            name: { type: String, required: true },
            code: { type: String, required: true },
            status: { type: String, enum: ["Open", "Maintenance", "Closed"], default: "Open" }
        }],
        integrations: {
            razorpay: { type: Boolean, default: false },
            whatsapp: { type: Boolean, default: false },
            mailgun: { type: Boolean, default: false },
            twilio: { type: Boolean, default: false }
        },
        billing: {
            plan: { type: String, default: "Pro" },
            invoices: [{
                id: { type: String },
                amount: { type: String },
                date: { type: Date },
                status: { type: String, enum: ["Paid", "Pending"], default: "Paid" }
            }]
        },
        advanced: {
            automation: {
                dailyBackup: { type: Boolean, default: true },
                cleanupSessions: { type: Boolean, default: true },
                rebuildAnalytics: { type: Boolean, default: true },
                syncEmailLists: { type: Boolean, default: true }
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Setting", SettingSchema);

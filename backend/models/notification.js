const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
    {
        content: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
        status: { type: Boolean, required: true },
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now, required: false },
    }
);

const Notification = mongoose.model("Notification",notificationSchema);

module.exports = { Notification } 
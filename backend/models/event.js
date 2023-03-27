const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        type: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        location: { type: String },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now, required: false },
    }
);

const Event = mongoose.model("Event",eventSchema);

module.exports = { Event } 
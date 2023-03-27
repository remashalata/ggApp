const mongoose = require("mongoose");

const eventHistorySchema = mongoose.Schema(
    {
        eventId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Event" },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
        status: { type: Boolean }
    }
);

const EventHistory = mongoose.model("EventHistory",eventHistorySchema);

module.exports = { EventHistory } 
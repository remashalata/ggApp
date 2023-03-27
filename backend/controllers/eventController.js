const { Event } = require("../models/event");
const { Notification } = require("../models/notification");
const { EventHistory } = require("../models/eventHistory");
var mongoose = require('mongoose');
const { User } = require("../models/user");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
// all events data get
const getEvents = async (req, res) => {
    const events = await Event.find();
    res.status(200).send(events);
};

//
const getUserEvents = async (req, res) => {
    const userId = req.user._id;
    const events = await Event.find({ userId: userId});
    res.status(200).send(events);
};

// get one event data
const getOneEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById({ _id: eventId }, { __v: 0 });

        res.status(200).send(event);

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// create event data
const requestJoin = async (req, res) => {
    const { eventId } = req.params;
    const { _id } = req.user;
    const eventHistory = EventHistory({
        eventId: eventId,
        userId: _id, 
        status: false
    });
    await eventHistory.save();
    const event = await Event.findById(eventId);
    const user = await User.findById(_id);
    const content = `${user.firstname} joined your event ${event.type}`;
    const notification = Notification({
        content: content,
        userId: event.userId,
        status: false
    });
    await notification.save();
    res.status(201).send(eventHistory);
};

const updateStatusEvent = async (req, res) => {
    const { eventHistoryId } = req.params;
    try {
        const oldHistory = await EventHistory.findById({ _id: eventHistoryId });
        oldHistory.status = true;
        await oldHistory.save();

        res.status(200).send({ status: 'success' });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// get request event data
const getMyRequestEvent = async (req, res) => {
    const { _id } = req.user;
    try {
        const eventHistory = await EventHistory.find({ userId: _id }, { __v: 0 }).populate("eventId", ["name"]);

        res.status(200).send(eventHistory);

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// all events history data get
const getEventHistories = async (req, res) => {
    const eventHistories = await EventHistory.find().populate("eventId", ["name"]);
    res.status(200).send(eventHistories);
};

module.exports = {
    getEvents,
    getOneEvent,
    requestJoin,
    getMyRequestEvent,
    getEventHistories,
    updateStatusEvent,
    getUserEvents
}
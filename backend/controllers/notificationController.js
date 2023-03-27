const { Notification } = require("../models/notification");

const getNotifications = async (req, res) => {
    const userId = req.user._id;
    const notifications = await Notification.find({ userId: userId });
    const newNotifications = await Notification.find({ userId: userId, status: false });
    res.status(200).send({ notifications: notifications, newNotifications: newNotifications});
};

const readNotifications = async (req, res) => {
    const userId = req.user._id;
    await Notification.updateMany({ userId: userId, status: false }, { $set: { status: true }}, {new: true});
    const newNotifications = await Notification.find({ userId: userId, status: false });
    res.status(200).send(newNotifications);
};

module.exports = {
    getNotifications,
    readNotifications
}

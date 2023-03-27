const { Event } = require("../models/event");

const createPlace = async (req, res) => {
    const { name, description, type, startDate, endDate, location, latitude, longitude } = req.body;
    const nameExist = await Event.findOne({ name: name });
    if (nameExist) {
        res.status(400).send("The Place already exists");
    } else {
        const event = Event({
            name: name,
            description: description,
            type: type,
            startDate: startDate,
            endDate: endDate,
            location: location,
            latitude: latitude,
            longitude: longitude,
            userId: req.user.id
        });
        await event.save();
        res.send(event);
    }

};

const removePlace = async (req, res) => {
    const { placeId } = req.params;
    try {
        await Event.deleteOne({ _id: placeId });
        res.send({ status: "ok" })
    } catch (error) {
        res.status(400).send(error);
    }

}

module.exports = {
    createPlace,
    removePlace,
}
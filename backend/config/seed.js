const mongoose = require("mongoose");
const { User } = require("../models/user");
const { Event } = require("../models/event");

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/ggym', {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log(`mongodb connected`);
})
.catch((err) => {
    console.log(err);
})

const seedUsers = [
    {
        "firstname": "test",
        "lastname": "test",
        "email": "test@gmail.com",
        "password": "$2a$10$35P01W/MBbZAYO1.PMQ/wOu/TSNxX5.ZBBZ3HnWTThW2GXv8aiZIC",
        "latitude": 25.2048493,
        "longitude": 55.2707828,
        "role": "admin"
    }
]

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
}

seedDB().then(() => {
    mongoose.connection.close();
})
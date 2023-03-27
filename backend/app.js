var express = require('express');
require('dotenv').config()
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const { connectDB } = require("./config/db");

//routes
const userRoute = require("./routes/userRoute.js");
const eventRoute = require("./routes/eventRoute.js");
const placeRoute = require("./routes/placeRoute.js");
const notificationRoute = require("./routes/notificationRoute.js");
const app = express();

// Connect Database
connectDB();

app.use(express.json());
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/places", placeRoute);
app.use("/api/notifications", notificationRoute);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        colors.yellow.bold(`Server running on port http://localhost:${PORT}`)
    )
)
const { User } = require("../models/user");
const { generateToken } = require("../utils/generateToken");

// login user
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {

        res.status(200).json({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            latitude: user.latitude,
            longitude: user.longitude,
            role: user.role,
            accessToken: generateToken(user._id),
        });
    } else {
        res.status(401).send("Invalid Email or Password!");
    }
};

//register user
const signup = async (req, res) => {
    const { firstname, lastname, email, latitude, longitude, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        res.status(400).send("The user already exists");
    }

    const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        latitude: latitude,
        longitude: longitude,
        email: email,
        role: "user",
        password: password,
    });

    if (user) {
        res.status(201).json({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            latitude: user.latitude,
            longitude: user.longitude,
            
        });
    } else {
        res.status(400).send("Invalid user data");
    }
};

// all users data get
const getUsers = async (req, res) => {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.status(200).send(users);
};

//profile update
const profile = async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const userId = req.user._id
    try {
        const profileExist = await User.findById({ _id: userId });
        profileExist.firstname = firstname;
        profileExist.lastname = lastname;
        profileExist.email = email;
        profileExist.updateAt = Date.now();
        await profileExist.save();

        res.status(200).send(profileExist);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
}

module.exports = {
    signin,
    signup,
    getUsers,
    profile
}
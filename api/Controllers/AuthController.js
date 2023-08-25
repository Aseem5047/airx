const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user

const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPass;
    const newUser = new UserModel(req.body);

    try {
        const existingUser = await UserModel.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }],
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Given username/email is already registered" });
        }

        const user = await newUser.save();
        const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// login User

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);
            if (!validity) {
                res.status(400).json("Wrong Password");
            } else {
                const token = jwt.sign(
                    { username: user.username, id: user._id },
                    process.env.JWT_KEY,
                    { expiresIn: "1d" }
                );
                res.status(200).cookie('token', token).json({ user, token });
            }
        } else {
            res.status(404).json("User does not exist");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};


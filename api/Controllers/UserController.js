const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { decode } = jwt;


// res - server to user / req - user to server

const getUser = async (req, res) => {
    const id = req.params?.id;
    const { userId } = req.body;

    try {
        const user = await UserModel.findById(userId || id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        }
        else {
            res.status(404).json("No such user exists");
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

const editProfile = async (req, res) => {
    const id = req.params?.id;
    console.log("Data Received", req.body);
    const { _id, password, ...otherFields } = req.body;

    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            } else {
                // Remove the password field from the update object
                delete otherFields.password;
            }

            const user = await UserModel.findByIdAndUpdate(id, otherFields, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("Access Denied! You can update only your own Account.");
    }
};



// get a User via token cookie

const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        // res.status(200).json({ token: token });
        const decodedToken = jwt.decode(token)
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        let expired = false

        // console.log(decodedToken, currentTime)

        if (decodedToken.exp < currentTime) {
            console.log('Token has expired');
            expired = true;
            // Perform actions for an expired token
        } else {
            console.log('Token is valid');
            expired = false
            // Perform actions for a valid token
        }

        jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
            if (expired) {
                res.status(401).json("Invalid or expired token");
            } else {

                const userDetails = await UserModel.findById(userData.id);
                const { password, ...otherDetails } = userDetails._doc
                res.status(200).json(otherDetails)
            }
        })
    } else {
        // console.log("Token not found");
        res.status(401).json("Invalid or expired token");
    }
}

module.exports = {
    getProfile,
    getUser,
    editProfile
};
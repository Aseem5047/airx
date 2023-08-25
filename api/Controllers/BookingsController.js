const BookingsModel = require('../models/BookingsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { decode } = jwt;

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_KEY, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

const createBookings = async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut, numberOfGuests, fullName, phone, price
    } = req.body;

    // console.log("Body ", req.body)
    // console.log("Body ", numberOfGuests)
    // console.log("UserData ", userData.id)

    BookingsModel.create({
        place: place, user: userData.id, checkIn: checkIn, checkOut: checkOut, numberOfGuests: numberOfGuests, name: fullName, phone: phone, price: price
    }).then((doc) => {
        res.status(200).json(doc);
    }).catch((err) => {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: err });
    });
}

const getBookings = async (req, res) => {

    const userData = await getUserDataFromReq(req);

    res.status(200).json(await BookingsModel.find({ user: userData.id }).populate('place'))

}

const getBooking = async (req, res) => {

    const { bookingId } = req.params

    const booking = await BookingsModel.findById(bookingId).populate('place')

    res.status(200).json(booking)

}

module.exports = {
    createBookings, getBookings, getBooking
};
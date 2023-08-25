const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    features: [String],
    extraInfo: String,
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
    price: Number,

})

const PlaceModel = mongoose.model('Place', PlaceSchema)

module.exports = PlaceModel;

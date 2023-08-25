const PlaceModel = require('../models/PlaceModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { decode } = jwt;


// res - server to user / req - user to server

// add a new place

const addPlace = async (req, res) => {
    const { token } = req.cookies;

    const {
        title,
        address,
        photos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;

    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {

        const placeDoc = await PlaceModel.create({
            owner: userData.id,
            title: title,
            address: address,
            photos: photos,
            description: description,
            features: features,
            extraInfo: extraInfo,
            checkIn: checkIn,
            checkOut: checkOut,
            maxGuests: maxGuests,
            price: price,
        })

        res.status(200).json(placeDoc)

        console.log(placeDoc);

    })

}

const editGivenPlace = async (req, res) => {
    const { token } = req.cookies;

    const {
        placeId,
        title,
        address,
        photos,
        description,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests
    } = req.body;


    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
        const placeDoc = await PlaceModel.findById(placeId)
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title: title,
                address: address,
                photos: photos,
                description: description,
                features: features,
                extraInfo: extraInfo,
                checkIn: checkIn,
                checkOut: checkOut,
                maxGuests: maxGuests,
            })

            await placeDoc.save()

            res.status(200).json('The document has been Updated')

            console.log(placeDoc);
        }
    })
}

const getAllPlaces = async (req, res) => {
    res.status(200).json(await PlaceModel.find())
}

const getUserPlaces = async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_KEY, {}, async (err, userData) => {
        if (err) {
            console.log("Error verifying JWT:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        const { id } = userData;

        try {
            const places = await PlaceModel.find({ owner: id });
            res.status(200).json(places);
        } catch (err) {
            console.log("Error getting places:", err);
            res.status(404).json("No Places found");
        }
    });
};

const getPlacesById = async (req, res) => {
    const { placeId } = req.params
    // const place = await PlaceModel.findById(placeId)

    console.log(placeId);

    const place = await PlaceModel.findById(placeId)

    res.status(200).json(place)

    console.log(place);

    // res.json(await )
}





module.exports = {
    addPlace, getUserPlaces, getAllPlaces, getPlacesById, editGivenPlace
};
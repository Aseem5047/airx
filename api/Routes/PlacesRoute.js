const express = require("express");
const { addPlace, getUserPlaces, getAllPlaces, getPlacesById, editGivenPlace } = require("../Controllers/PlaceController");

const router = express.Router();

router.post('/addNew', addPlace);
router.get('/userPlaces', getUserPlaces);
router.get('/:placeId', getPlacesById);
router.put('/edit', editGivenPlace)
router.get('/', getAllPlaces)

module.exports = router;

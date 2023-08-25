const express = require('express');
const { createBookings, getBookings, getBooking } = require('../Controllers/BookingsController');

const router = express.Router()

router.post('/create', createBookings)
router.get('/', getBookings)
router.get('/:bookingId', getBooking)

module.exports = router;

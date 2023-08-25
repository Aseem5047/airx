const express = require('express');
const { loginUser, registerUser } = require('../Controllers/AuthController');

// Rest of your code...


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;

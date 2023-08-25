const express = require("express");
const { getProfile, getUser, editProfile } = require("../Controllers/UserController");

const router = express.Router();

router.get('/profile', getProfile);
router.get('/profile/:id', getUser);
router.post('/editProfile/:id', editProfile);


module.exports = router;

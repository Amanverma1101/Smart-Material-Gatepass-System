const express = require("express");
const router = express.Router();

const {saveUserData} = require('../controllers/newuser');

router.post("/usersignup",saveUserData);

module.exports = router;
const express = require("express");
const router = express.Router();

const {saveUserDataAndSignup, loginUser} = require('../controllers/authuser');

router.post("/usersignup",saveUserDataAndSignup);
router.post("/userlogin",loginUser);

module.exports = router;
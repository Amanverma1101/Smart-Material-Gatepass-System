const express = require("express");
const router = express.Router();

const {saveUserDataAndSignup, loginUser, logoutuser} = require('../controllers/authuser');

router.post("/usersignup",saveUserDataAndSignup);
router.post("/userlogin",loginUser);
router.get("/userlogout",logoutuser);

module.exports = router;
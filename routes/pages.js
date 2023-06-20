const express = require("express");
const router = express.Router();
const {fetchProfile} = require("../controllers/user")

router.get('/',async(req,res)=>{
    res.render("home");
});
router.get('/usersignup',async(req,res)=>{
    res.render("usersignup",{msg: ""});
});
router.get('/userlogin',async(req,res)=>{
    res.render("userlogin",{msg: ""});
});
router.get('/user/profile',fetchProfile);

router.get('/appdb',async(req,res)=>{
    res.render("appdb",{msg: ""});
});
router.get('/material/gatepass',async(req,res)=>{
    res.render("matform",{msg: ""});
});


module.exports = router;
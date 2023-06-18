const express = require("express");
const router = express.Router();

router.get('/',async(req,res)=>{
    res.render("home");
});
router.get('/usersignup',async(req,res)=>{
    res.render("usersignup",{msg: ""});
});
router.get('/userlogin',async(req,res)=>{
    res.render("userlogin",{msg: ""});
});
router.get('/user/profile',async(req,res)=>{
    res.render("userdb",{msg: ""});
});
router.get('/appdb',async(req,res)=>{
    res.render("appdb",{msg: ""});
});
router.get('/matform',async(req,res)=>{
    res.render("matform",{msg: ""});
});


module.exports = router;
const express = require("express");
const router = express.Router();
const {fetchProfile, fetchform} = require("../controllers/user");
const {fetchreq} = require("../controllers/approvemat");
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

router.get('/approver/profile',fetchreq);

router.get("/showstatus/:mail/:id",fetchform);

router.get('/material/gatepass',async(req,res)=>{
    res.render("matform",{msg: ""});
});


module.exports = router;
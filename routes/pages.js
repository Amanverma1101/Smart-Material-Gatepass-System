const express = require("express");
const router = express.Router();

router.get('/',async(req,res)=>{
    res.render("userdb");
});
router.get('/usersignup',async(req,res)=>{
    res.render("usersignup",{msg: ""});
});


module.exports = router;
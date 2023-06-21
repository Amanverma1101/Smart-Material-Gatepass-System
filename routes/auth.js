const express = require("express");
const router = express.Router();
const { signupApprover, loginApprover } = require("../controllers/authapprover");

router.get('/signup/approver',async(req,res)=>{
    res.render("approversignup",{msg:""});
});
router.get('/login/approver',async(req,res)=>{
    res.render("approverlogin",{msg:""});
});

router.post('/approversignup',signupApprover);
router.post('/approverlogin',loginApprover);

module.exports = router;
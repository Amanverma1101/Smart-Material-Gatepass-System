const express = require("express");
const router = express.Router();

router.get('/dept',async(req,res)=>{
    res.render("dept");
});

module.exports = router;
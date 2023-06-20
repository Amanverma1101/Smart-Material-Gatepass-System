const express = require("express");
const router = express.Router();
const { saveMatInfo } = require("../controllers/material");

router.post('/save/matform',saveMatInfo);

module.exports = router;
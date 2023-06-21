const express = require("express");
const router = express.Router();
const { saveMatInfo,fetchMatForm,approveMatform } = require("../controllers/material");

router.post('/save/matform',saveMatInfo);
router.get('/approve/:mail/:id',fetchMatForm);
router.post('/approveMatform',approveMatform);

module.exports = router;
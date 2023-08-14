const express = require("express");
const router = express.Router();

const { getDoProfile, getAppointments } = require("../controller/DoProfile");


router.get('/DoProfile/:id',getDoProfile)
router.get('/appointment/:id' ,getAppointments)

module.exports = router ;
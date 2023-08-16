const express = require("express");
const router = express.Router();

const { getDoProfile, getPatientsWithAppointments, getDoctors, getColleaguesCount } = require("../controller/DoProfile");


router.get('/DoProfile/:id',getDoProfile)
router.get('/appointment/:id' ,getPatientsWithAppointments)
router.get('/doctors' ,getDoctors)
router.get('/doctorsCount' ,getColleaguesCount)


module.exports = router ;
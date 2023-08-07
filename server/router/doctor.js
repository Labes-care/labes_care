const router = require("express").Router();

const DoctorController = require ('../controller/Doctor/doctor')


router.get("/allDoctors",DoctorController.getAllDoctors) ;

module.exports = router ;
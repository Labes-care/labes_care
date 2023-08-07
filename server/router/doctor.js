const router = require("express").Router();
const{getAllDoctors} = require ('../controller/Doctor/doctor');


router.get("/AllDoctors",getAllDoctors) ;

module.exports = router ;
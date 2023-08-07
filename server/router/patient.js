const router = require("express").Router();
const{getAllPatients} = require ('../controller/Patient/patient');


router.get("/AllPatients/: doctors_iddoctors",getAllPatients) ;

module.exports = router ;
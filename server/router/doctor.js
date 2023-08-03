const router = require("epress").Router();
const{getAllDoctors} = require ('../controller/Doctor/doctor');


router.get("/AllDoctors",getAllDoctors) ;
module.exports = router ;
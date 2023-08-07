const router = require("express").Router();
const{getAllDoctors,getOneDoctor,updateDoctor,deleteDoctor} = require ('../controller/DoctorProfile/doctorPofile');
//const doctorRoutes = require ('../controller/Doctor/doctor')

router.get("/AllDoctors",getAllDoctors) ;
router.get ("/OneDoctor/:id",getOneDoctor)
router.put('/:id',updateDoctor)
router.delete('/:id',deleteDoctor)

module.exports = router ;
const router = require("express").Router();
const{getAllDoctors,getOneDoctor,deleteDoctor,updateAccount,updateProfile,updateCover,updateSecurity} = require ('../controller/DoctorProfile/doctorPofile');
//const doctorRoutes = require ('../controller/Doctor/doctor')

router.get("/AllDoctors",getAllDoctors) ;
router.get ("/OneDoctor/:id",getOneDoctor)
router.delete('/:id',deleteDoctor)
router.put('/Account/:id',updateAccount)
router.put('/ProfilePic/:id',updateProfile)
router.put('/CoverPic/:id',updateCover)
router.put('/security/:id',updateSecurity)

module.exports = router ;
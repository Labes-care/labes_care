const router = require("express").Router();
const chatRouter = require ('../controller/chatDocPatient/chat');


router.get("/DoctorMessage/:doctorId",chatRouter.getMessagesDoctor) ;
router.get ("/PatientMessage/:patientId",chatRouter.getMessagesPatient)


module.exports = router ;
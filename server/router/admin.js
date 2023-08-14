const router = require("express").Router();

const admindashboard = require ('../controller/adminApproveReject/admin')


router.get("/getPendingDoctor",admindashboard.getPendingDoctor) ;
router.put("/approveDoctor/:id",admindashboard.approveDoctor) ;
router.put("/rejectedDoctor/:id",admindashboard.rejectedDoctor) ;

module.exports = router 
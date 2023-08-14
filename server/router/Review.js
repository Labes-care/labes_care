const router = require("express").Router();
const {createReview,getAllReview} = require ('../controller/Review/Review');


router.post("/patient/review",createReview)
router.post("/doctor/review",getAllReview)
module.exports=router
const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();

router.post("/patient/signup", AuthController.createPatient);
router.post("/doctor/signup", AuthController.createDoctor);

router.post("/login",AuthController.Login);



module.exports = router
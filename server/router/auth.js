const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();

router.post("/signup", AuthController.createPatient);
router.post("/login",AuthController.login);

module.exports = router
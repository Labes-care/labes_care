const express = require("express");
const router = express.Router();

const { getDoProfile } = require("../controller/DoProfile");


router.get('/DoProfile/:id',getDoProfile)

module.exports = router ;
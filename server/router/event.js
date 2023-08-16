const router = require("express").Router();
const {AddEvents}= require ("../controller/doctorevents/event")

router.post("/Addevents/:id",AddEvents)


module.exports=router
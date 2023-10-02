const router = require("express").Router();
const {AddEvents , getEvents}= require ("../controller/doctorevents/event")

router.post("/Addevents/:id",AddEvents)
router.get("/getAll",getEvents)


module.exports=router
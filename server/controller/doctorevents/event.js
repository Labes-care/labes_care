const Event = require ('../../model/event')


module.exports={
AddEvents:(req,res)=>{
  console.log("ev",Event)
    Event.create({
        doctors_iddoctors:req.params.id,
        title:req.body.title,
        category:req.body.category,
        date:req.body.date,
        details:req.body.details
    })
    .then((result) => {
        res.status(200).send(result);
      })
    .catch((err) => {
        res.status(500).send(err);
      });
},
getEvents : (req,res) => {
     Event.findAll()
     .then((event) => {
      res.status(200).json(event);
     })
    .catch(() => {
      console.error(err);
      res.status(500).json({ err: 'No event found' });
    })
  }
}
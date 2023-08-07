const doctor = require ('../../model/doctor');
  module.exports= {

    getAllDoctors(req,res){
        doctor.findAll({})
        .then((doctors)=>{
            res.status(200).json(doctors);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json({err:'No doctor found'})
        })
      }
}
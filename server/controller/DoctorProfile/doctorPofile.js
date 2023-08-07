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
    },
    getOneDoctor(req,res){
     doctor.findOne({where: { id: req.params.id } })
     .then((doctors)=>{
        res.status(200).json(doctors);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({err:'No doctor found'})
    })
    },
    updateDoctor(req,res){
      doctor.update(
        {
          fullname:req.body.fullname,
          email:req.body.email,
          password: req.body.password,
          address:req.body.address,
          phonenumber: req.body.phonenumber,
          cover_img:req.body.image,
          profile_img:req.body.image,
          
        },
        {where: { id: req.params.id } })
        .then((doctors)=>{
            res.status(200).json(doctors);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json({err:'No doctor found'})
        })
    },
    deleteDoctor(req,res){
        doctor.destroy({
            where: {
              id: req.params.id
            }
          })
          .then((results) => {
            res.status(200).send(results); 
          })
          .catch((error) => {
            res.status(500).send(error);
          });
    }
}
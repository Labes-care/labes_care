const patient = require ('../../model/patient');

module.exports = {
    getAllPatients(req,res){
        patient.findAll({where: { doctors_iddoctors: req.params.doctors_iddoctors }})
        .then((patients)=>{
            res.status(200).json(patients);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json({err:'No patients found'})
        })
    }

}
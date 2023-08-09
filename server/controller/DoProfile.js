const doctor = require ('../model/doctor.js')

const DoProfile = {

getDoProfile : async(req,res)=>{
    const { id } = req.params;

    try {
      const Doctor = await doctor.findByPk(id);
  
      if (!Doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      return res.status(200).json(Doctor);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving Doctor profile' });
    }


}

} 

module.exports = DoProfile
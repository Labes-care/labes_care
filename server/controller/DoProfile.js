const doctor = require ('../model/doctor.js')
const appointment = require ('../model/DoctorsPatients.js')
const Patient = require('../model/patient.js')

const DoProfile = {

getDoProfile : async(req,res)=>{
    const { id } = req.params;

    try {
      const Doctor = await doctor.findOne({
        where:{id}
      });
  
      if (!Doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      return res.status(200).json(Doctor);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving Doctor profile' });
    }
  },

    getAppointments : async(req,res)=>{
      const { id } = req.params;
  
      try {
        const Appointment = await appointment.findAll({
          where:{
            doctors_iddoctors:id,
            status:0
          },
          include: [
            {
              model: Patient,
              attributes: ['id','fullname', 'gender', 'birthday', 'email', 'address', 'profile_img']
            }
          ]
        });
    console.log(Appointment);
    if (!Appointment || Appointment.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this doctor' });
    }
    
        return res.status(200).json(Appointment);
      } catch (error) {
        return res.status(500).json({ message: 'Error retrieving appointments' });
      

}

} 
}

module.exports = DoProfile;
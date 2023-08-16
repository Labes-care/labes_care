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


  
  // Function to get appointment data and patient information
   getPatientsWithAppointments: async(req,res) =>{
    const { id } = req.params;
    try {
      // Find the doctor by ID
      const Doctor = await doctor.findByPk(id);
  
      if (!Doctor) {
        throw new Error('Doctor not found');
      }
  
      // Get appointments associated with the doctor
      const Appointments = await appointment.findAll({
        where: { doctors_iddoctors: id },
        include: [{ model: Patient }],
      });
  
      // Extract patients from appointments
      const patients = Appointments.map(Appointment => Appointment.Patient);
  
      res.json({ patients }); 
    } catch (error) {
      res.status(500).json({ error: `Error getting patients with appointments: ${error.message}` })
    }
   },

   getDoctors: async (req,res)=>{
    try {
      const Doctors = await doctor.findAll();
  
      if (!Doctors) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      return res.status(200).json(Doctors);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving Doctor profile' });
    }
   },
   getColleaguesCount: async(req,res)=>{
    try{
      const count = await doctor.count();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: 'Error counting doctors' });
    }
   }
  
  
  
}

module.exports = DoProfile;
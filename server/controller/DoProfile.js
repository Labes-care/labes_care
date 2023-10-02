const doctor = require("../model/doctor.js");
const appointment = require("../model/DoctorsPatients.js");
const Patient = require("../model/patient.js");
const DoctorsPatients = require("../model/DoctorsPatients.js");
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'dxjiajgje',
  api_key: '251991165818191',
  api_secret: 'qDAMRwSJ_nrWbs5Egxh56qdOkCI', 
});

const DoProfile = {
  getDoProfile: async (req, res) => {
    const { id } = req.params;

    try {
      const Doctor = await doctor.findOne({
        where: { id },
      });

      if (!Doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      return res.status(200).json(Doctor);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving Doctor profile" });
    }
  },

  getPatientsWithAppointments: async (req, res) => {
    try {
      const appointments = await DoctorsPatients.findAll({
        where: {
          doctors_iddoctors: req.params.id,
          checked: 0,
        },
        include: [
          {
            model: Patient,
          },
        ],
      });

      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
      res
        .status(500)
        .json({
          error: "An error occurred while fetching patient appointments.",
        });
    }
  },

  getPatientsWithAppointmentsChecked: async (req, res) => {
    try {
      const appointments = await DoctorsPatients.findAll({
        where: {
          doctors_iddoctors: req.params.id,
          checked: 1,
        },
        include: [
          {
            model: Patient,
          },
        ],
      });

      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
      res
        .status(500)
        .json({
          error: "An error occurred while fetching patient appointments.",
        });
    }
  },

   updateAppointmentChecked : async (req,res) => {
    const id = req.params.id; 
    const patientid = req.body.patients_idpatients
    try {
      const appointment = await DoctorsPatients.findOne({
        where: {
          doctors_iddoctors: id,
          patients_idpatients: patientid
        }
      });
      if (appointment) {
        appointment.checked = 1;
        await appointment.save();
        res.status(200).json({ success: true, message: 'Appointment checked value updated successfully' });
      } else {
        res.status(500).json({ success: false, message: 'Appointment not found' });
      }
    } catch (error) {
      console.error('Error updating appointment checked value:', error);
      res.status(500).json({ success: false, message: 'An error occurred while updating appointment checked value' });
    }
  },

  // Function to get appointment data and patient information
  // getPatientsWithAppointments: async(id,res) =>{
  //   try {
  //     const Appointments = await DoctorsPatients.findAll({
  //       where: { doctorId: id },
  //       include: [
  //         {
  //           model: Patient,
  //           as: 'patients',
  //           attributes: ['id', 'fullname', 'email', 'profile_img','gender'],
  //         },
  //       ],
  //     });

  //     if (!Appointments) {
  //       return res.status(404).json({ message: 'Doctor not found' });
  //     }

  //     return res.status(200).json(Appointments);
  //   } catch (error) {
  //     console.error('Error retrieving appointments with patient information:', error);
  //     return res.status(500).json({error: `An error occurred: ${error.message}` });
  //   }
  //  },

  getDoctors: async (req, res) => {
    try {
      const Doctors = await doctor.findAll();

      if (!Doctors) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      return res.status(200).json(Doctors);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving Doctor profile" });
    }
  },
  getColleaguesCount: async (req, res) => {
    try {
      const count = await doctor.count();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: "Error counting doctors" });
    }
  },

  getAppointmentCount: async (req, res) => {
    const { id } = req.params;
    try {
      const appointmentCount = await DoctorsPatients.count({
        where: {
          doctors_iddoctors: id,
        },
      });

      return res.status(200).json(appointmentCount);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving Doctor profile" });
    }
  },

  getMalePatient: async (req, res) => {
    
    try {
      const count = await DoctorsPatients.count({
        where: { doctors_iddoctors: req.params.id },
        include: [
          {
            model: Patient,
            where: { gender: "male" },
          },
        ],
      });

        res.json({ count: count });
     
    } catch (error) {
      console.error("Error fetching male patient count:", error);
      throw error;
    }
  },

  getFemalePatient: async (req, res) => {
    
    try {
      const count = await DoctorsPatients.count({
        where: { doctors_iddoctors: req.params.id },
        include: [
          {
            model: Patient,
            where: { gender: "female" },
          },
        ],
      });

        res.json({ count: count });
     
    } catch (error) {
      console.error("Error fetching male patient count:", error);
      throw error;
    }
  },

  getOldNewPatient : async (req,res)=>{

    try{
    const doctorsPatients = await DoctorsPatients.findAll({
      where: {
        doctors_iddoctors: req.params.id
      },
    });

    const currentDate = new Date();
    
    const oldPatients = doctorsPatients.filter(appointment => {
      const appointmentDate = appointment.createdAt;
      return appointmentDate < currentDate;
    });

    const newPatients = doctorsPatients.filter(appointment => {
      const appointmentDate = appointment.createdAt;
      return appointmentDate >= currentDate;
    });

    res.json({
      oldPatients: oldPatients.length,
      newPatients: newPatients.length,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
  },

  updatePassword: async (req, res) => {
    const id = req.params.id;
    const { currentPassword, newPassword } = req.body;
  
    try {
      const Doctor = await doctor.findOne({ where: { id: id } });
  
      if (!doctor) {
        throw new Error('Doctor not found');
      }
  
      // Check if the provided current password matches the stored password
      if (currentPassword !== doctor.password) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }
  
      // Update the password with the new one
      await Doctor.update({ password: newPassword });
  
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
},



updateFullname : async (req, res) => {
  const id= req.params.id;
  const { fullname } = req.body;
  try {
    const Doctor = await doctor.findOne({ where: { id: id } });

    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await Doctor.update( { fullname :fullname });
    res.json({ success: true, message: 'fullname updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
},

updateEmail : async (req, res) => {
  const id= req.params.id;
  const { email } = req.body;
  try {
    const Doctor = await doctor.findOne({ where: { id: id } });

    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await Doctor.update( { email :email });
    res.json({ success: true, message: 'email updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
},

updatePhonenumber : async (req, res) => {
  const id= req.params.id;
  const { phonenumber } = req.body;
  try {
    const Doctor = await doctor.findOne({ where: { id: id } });

    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await Doctor.update( { phonenumber :phonenumber });
    res.json({ success: true, message: 'phonenumber updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
},

updateAddress : async (req, res) => {
  const id= req.params.id;
  const { address } = req.body;
  try {
    const Doctor = await doctor.findOne({ where: { id: id } });

    if (!doctor) {
      throw new Error('Doctor not found');
    }
    await Doctor.update( { address :address });
    res.json({ success: true, message: 'address updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
},




}
module.exports = DoProfile;

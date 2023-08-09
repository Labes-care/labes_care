const Doctor=require('../../model/doctor')
const nodemailer = require('nodemailer');



const admindashboard = {

getPendingDoctor: async (req, res) => {
    try {
      const pendingDoctors = await Doctor.findAll({
        where: { approvalStatus: 'pending' },
      });
  
      res.status(200).json(pendingDoctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching pending doctors' });
    }
  },

  approveDoctor: async (req, res) => {
    try {
      const { id } = req.params;
  
 
      await Doctor.update(
        { approvalStatus: 'approved' },
        { where: { id: id } }
      );
  
      // Send an email to the doctor (implement this part)

      const doctor = await Doctor.findByPk(id);

      if (doctor) {
        const transporter = nodemailer.createTransport({
          // Your email service configuration here
          service: 'Gmail',
          auth: {
            user: 'alouisouhail227@gmail.com',
            pass: 'oopduqtlhilozpiy',
          },
        });
  
        const mailOptions = {
          from: 'alouisouhail227@gmail.com',
          to: doctor.email,
          subject: 'Doctor Approval',
          text: 'Your account has been approved.',
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
  
  
      res.status(200).json({ message: 'Doctor approved' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error approving doctor' });
    }
  },

  rejectedDoctor: async (req, res) => {
    try {
      const { id } = req.params;
  
 
      await Doctor.update(
        { approvalStatus: 'rejected' },
        { where: { id: id } }
      );

      if (doctor) {
        const transporter = nodemailer.createTransport({
          // Your email service configuration here
          service: 'Gmail',
          auth: {
            user: 'alouisouhail227@gmail.com',
            pass: 'oopduqtlhilozpiy',
          },
        });
  
        const doctor = await Doctor.findByPk(id);

        const mailOptions = {
          from: 'alouisouhail227@gmail.com',
          to: doctor.email,
          subject: 'Doctor Rejection',
          text: 'Your account has been rejected.',
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
  
      res.status(200).json({ message: 'Doctor rejected' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error rejecting doctor' });
    }
  }

}
  module.exports = admindashboard;
const express = require("express");
const router = express.Router();
const doctor = require("../model/doctor.js");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: 'dxjiajgje',
  api_key: '251991165818191',
  api_secret: 'qDAMRwSJ_nrWbs5Egxh56qdOkCI', 
});



const { getDoProfile, getPatientsWithAppointments, getDoctors, getColleaguesCount,getAppointmentCount,getMalePatient, getFemalePatient, getOldNewPatient, updateAppointmentChecked, updatePassword, updateFullname, updateEmail, updatePhonenumber, updateAddress, updateProfileImg, getPatientsWithAppointmentsChecked } = require("../controller/DoProfile");


router.get('/DoProfile/:id',getDoProfile)
router.get('/appointment/:id' ,getPatientsWithAppointments);
router.get('/appointmentchecked/:id' ,getPatientsWithAppointmentsChecked);
router.get('/doctors' ,getDoctors)
router.get('/doctorsCount' ,getColleaguesCount)
router.get('/getAppointmentCount/:id' ,getAppointmentCount)
router.get('/getMalePatient/:id' ,getMalePatient)
router.get('/getFemalePatient/:id' ,getFemalePatient)
router.get('/getOldNewPatient/:id' ,getOldNewPatient)
router.put('/updateAppointmentChecked/:id' ,updateAppointmentChecked)
router.put('/updatePassword/:id' ,updatePassword)
router.put('/updateFullname/:id' ,updateFullname)
router.put('/updateEmail/:id' ,updateEmail)
router.put('/updatePhonenumber/:id' ,updatePhonenumber)
router.put('/updateAddress/:id' ,updateAddress)




const upload = multer(); 


// Define the route for updating profile image
router.post('/updateProfileImg/:id', upload.single('profile_img'), async (req, res) => {
  const id = req.params.id;
  try {
    const Doctor = await doctor.findOne({ where: { id: id } });

    if (!Doctor) {
      throw new Error('Doctor not found');
    }
    const profileImage = req.file.buffer; // Get the buffer of the uploaded image
    const imageResult = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.log('Cloudinary error:', error);
          res.status(500).json({ success: false, message: 'An error occurred' });
        } else {
          console.log('Cloudinary result:', result);
          // Update the profile_img field in the database
          Doctor.update({ profile_img: result.secure_url });
          res.json({ success: true, message: 'Profile image updated successfully' });
        }
      }
    ).end(profileImage);
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
    console.log(error)
  }

});

router.post('/uploadCoverImage/:id', upload.single('cover_img'), async (req, res) => {
    const id = req.params.id;
    try {
      const Doctor = await doctor.findOne({ where: { id: id } });
  
      if (!Doctor) {
        throw new Error('Doctor not found');
      }
      const CoverImage = req.file.buffer; // Get the buffer of the uploaded image
      const imageResult = await cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.log('Cloudinary error:', error);
            res.status(500).json({ success: false, message: 'An error occurred' });
          } else {
            console.log('Cloudinary result:', result);
            // Update the profile_img field in the database
            Doctor.update({ cover_img: result.secure_url });
            res.json({ success: true, message: 'Profile image updated successfully' });
          }
        }
      ).end(CoverImage);
    } catch (error) {
      res.status(500).json({ success: false, message: 'An error occurred' });
      console.log(error)
    }
  
  });


module.exports = router ;
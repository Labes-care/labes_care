const express = require("express");
const AuthController = require("../controller/auth");
const router = express.Router();
const Doctor=require('../model/doctor')
const multer = require('multer');
const upload = multer(); 
const cloudinary = require('cloudinary').v2;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/patient/signup", AuthController.createPatient);
router.post("/doctor/signup", AuthController.createDoctor);



router.post("/patient/login",AuthController.PatientLogin);
router.post("/doctor/login",AuthController.DoctorLogin);


cloudinary.config({
    cloud_name: 'dxjiajgje',
    api_key: '251991165818191',
    api_secret: 'qDAMRwSJ_nrWbs5Egxh56qdOkCI', 
  });
  

router.post('/doctors', upload.single('certificate_img'), async (req, res) => {
    try {
      const { fullname, email, password, speciality, cin, phonenumber, address } = req.body;
  
      const existingDoctor = await Doctor.findOne({ where: { email } });
      if (existingDoctor) {
        return res.status(409).json({ error: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Upload the image to Cloudinary
      const imageResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(req.file.buffer);
      });
  
      const newDoctor = await Doctor.create({
        fullname,
        email,
        password: hashedPassword,
        speciality,
        cin,
        certificate_img: imageResult.secure_url, // Store the Cloudinary image URL
        phonenumber,
        address,
      });
  
      res.status(201).json({ message: 'Doctor created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post("/patient/login",AuthController.PatientLogin);
router.post("/doctor/login",AuthController.DoctorLogin);



module.exports = router
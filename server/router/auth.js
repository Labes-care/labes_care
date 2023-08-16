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
  

router.post('/doctors', upload.fields([{ name: 'certificate_img' }, { name: 'cin' }]), async (req, res) => {
    try {
      const { fullname, email, password, speciality, phonenumber, address } = req.body;
  
      const existingDoctor = await Doctor.findOne({ where: { email } });
      if (existingDoctor) {
        return res.status(409).json({ error: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Upload the image to Cloudinary
      const imageResults = await Promise.all(
        Object.keys(req.files).map(async (fieldName) => {
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
            ).end(req.files[fieldName][0].buffer);
          });
          return { fieldName, imageResult };
        })
      );
  
      const cinImage = imageResults.find((result) => result.fieldName === 'cin').imageResult;
      const certificateImg = imageResults.find((result) => result.fieldName === 'certificate_img').imageResult;
      // const profileimg = imageResults.find((result) => result.fieldName === 'profile_img').imageResult;
      // const coverimg = imageResults.find((result) => result.fieldName === 'cover_img').imageResult;
  
      const newDoctor = await Doctor.create({
        fullname,
        email,
        password: hashedPassword,
        speciality,
        cin:cinImage.secure_url,
        certificate_img: certificateImg.secure_url, // Store the Cloudinary image URL
        phonenumber,
        address,
        // profile_img: profileimg.secure_url,
        // cover_img: coverimg.secure_url,
      });
  
      res.status(201).json({ message: 'Doctor created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router
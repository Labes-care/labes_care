const patient=require('../model/patient')
const doctor=require('../model/doctor')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {


  createPatient: async (req, res) => {
    const { fullname,gender,birthday ,email, password,address} = req.body;

    try {
      const existingUser = await patient.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newPatient = await patient.create({
        fullname,
        gender,
        birthday ,
        email,
        password: hashedPassword,
        address,
        
      });
console.log(newPatient)
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },



  PatientLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const Patient = await patient.findOne({ where: { email } });
      if (!Patient) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, Patient.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: Patient.id, email: Patient.email }, 'your-secret-key', {
        
        expiresIn: '12h' 
        
      });
     
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },



  createDoctor: async (req, res) => {
    
    const { fullname,email, password,speciality, cin,certificate_img,phonenumber,address} = req.body;
console.log(req.body);
    try {
      const existingdoctor = await doctor.findOne({ where: { email } });
      if (existingdoctor) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newDoctor = await doctor.create({
        fullname,
        email,
        password: hashedPassword,
        speciality,
        cin,
        certificate_img,
        phonenumber,
        address,
      });
console.log(newDoctor)
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  DoctorLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const Doctor = await doctor.findOne({ where: { email } });
      if (!Doctor) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, Doctor.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: Doctor.id, email: Doctor.email }, 'your-secret-key', {
        
        expiresIn: '12h' 
        
      });
     
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AuthController;
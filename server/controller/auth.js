const patient=require('../model/patient')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthController = {
  createUser: async (req, res) => {
    const { fullname,gender,birthday ,email, password,created_at,address} = req.body;

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
        created_at,
        address,
        
      });
console.log(newPatient)
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  login: async (req, res) => {
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
  }
};

module.exports = AuthController;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Patient = require('../model/patient');
const { jwtSecret } = require('../config');

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const patient = await Patient.create({
      fullname: req.body.fullname,
      gender: req.body.gender,
      birthday: req.body.birthday,
      email: req.body.email,
      password: hashedPassword,
      address: req.body.address,
      profile_img: req.body.profile_img,
      cover_img: req.body.cover_img,
    });

    const token = jwt.sign({ id: patient.id }, jwtSecret, { expiresIn: '1h' });

    res.json({ patient, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { email: req.body.email } });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, patient.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: patient.id }, jwtSecret, { expiresIn: '1h' });

    res.json({ patient, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
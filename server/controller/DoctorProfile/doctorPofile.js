const doctor = require('../../model/doctor');
const cloudinary = require("../../utils/cloudinary");

const getAllDoctors = function (req, res) {
  doctor.findAll({})
    .then((doctors) => {
      res.status(200).json(doctors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: 'No doctor found' })
    })
}
const getOneDoctor = function (req, res) {
  doctor.findOne({ where: { id: req.params.id } })
    .then((doctor) => {
      res.status(200).json(doctor);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: 'No doctor found' })
    })
}

const updateProfile = async function (req, res) {
  try {
    console.log(cloudinary);
    const result = await cloudinary.uploader.upload(req.body.profile_img);
    doctor.update(
      {
        profile_img: result.secure_url,
        cloudinary_id: result.public_id
      },
      { where: { id: req.params.id } })
      .then((doctors) => {
        res.status(200).json(doctors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ err: 'No doctor found' })
      })
  }
  catch (error) {
    console.log(error);
  }
}

const updateCover = async function (req, res) {
  try {
    console.log(cloudinary);
    const result = await cloudinary.uploader.upload(req.body.profile_img);
    doctor.update(
      {
        cover_img: result.secure_url,
        cloudinary_id: result.public_id
      },
      { where: { id: req.params.id } })
      .then((doctors) => {
        res.status(200).json(doctors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ err: 'No doctor found' })
      })
  }
  catch (error) {
    console.log(error);
  }
}

const updateAccount = async function (req, res) {

  doctor.update(
    {
      fullname: req.body.fullname,
      address: req.body.address,
      phonenumber: req.body.phonenumber,
      biography: req.body.biography,
      education: req.body.education,
      experience: req.body.experience,
      skills: req.body.skills,

    },
    { where: { id: req.params.id } })
    .then((doctors) => {
      res.status(200).json(doctors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: 'No doctor found' })
    })
}


const updateSecurity = function (req, res) {
  doctor.update(
    {

      email: req.body.email,
      password: req.body.password

    },
    { where: { id: req.params.id } })
    .then((doctors) => {
      res.status(200).json(doctors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: 'No doctor found' })
    })
}
const deleteDoctor = function (req, res) {
  doctor.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

module.exports = { getAllDoctors, getOneDoctor, updateAccount, updateProfile, updateCover, updateSecurity, deleteDoctor }
const chat = require ('../../model/chatDocPatient')

module.exports.getMessagesDoctor = function (req, res, ) {
    chat.findAll({where: { doctorId: req.params.doctorId } })
    .then((chat) => {
      res.status(200).json(chat);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: 'No message found' })
    })
};

module.exports.getMessagesPatient = function (req, res, ) {
    chat.findAll({where: { patientId: req.params.patientId } })
    .then((chat) => {
      res.status(200).json(chat);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err: 'No message found' })
    })
};

module.exports.addMessageDoctor = function (req, res)  {
chat.create({
    message: req.body.message
},
{where: {  doctorId: req.params.doctorId }})
};

module.exports.addMessagePatient = function (req, res)  {
    chat.create({
        message: req.body.message
    },
    {where: {  patientId: req.params.patientId }})
    };
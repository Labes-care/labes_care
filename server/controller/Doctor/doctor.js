
const doctor = require ('../../model/doctor');
   const DoctorController= {
        async getAllDoctors(req, res) {
            try {
              const doctors = await doctor.findAll();
              res.status(200).json(doctors);
            } catch (err) {
              console.error(err);
              res.status(500).json({ err: 'No doctor found' });
            }
          }
        };

        module.exports=DoctorController

// const {doctor} = require ('../../model/doctor');
//   Module.exports= {
//     // AddDoctors(res,req)=>{
//     //     doctor.create({

//     //     })
//     // }
//     // ,
//     getAllDoctors(req,res){
//         doctor
//         .findAll()
//         .then((doctors)=>{
//             res.status(200).json(doctors);
//         })
//         .catch((err)=>{
//             console.error(err);
//             res.status(500).json({err:'No doctor found'})
//         })
//     }
// }


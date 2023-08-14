const Review = require ('../../model/Review/Review.js')
const patient=require('../../model/patient')
const doctor=require('../../model/doctor')

 module.exports={
    createReview : (req,res)=>{
        const {review,rating}=req.body ;
        const Patient_id = req.params.Patient_id ;
        const Doctor_id = req.params.Doctor_id ;

        Review.create({review,rating,Patient_id,Doctor_id})
        .then((response) => {
            res.status(201).send(response) ;
        })
        .catch((error=>{
            res.status(500).send(error)
        }));
    },
    getAllReview:(req,res)=>{
        const id = req.params.Doctor_id
    }
}
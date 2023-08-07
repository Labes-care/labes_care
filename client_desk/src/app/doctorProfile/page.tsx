"use client"

import React, { useState,useEffect } from 'react'
import axios from 'axios'

interface doctor {
fullname: string,
email:string,
password: string,
speciality: string,
cin: string,
phonenumber: string,
profile_img : string,
cover_img: string,
address:string
}

function Profile() {
const [doctors,setDoctors] = useState<doctor[]>([]) 

useEffect(() => {
  axios
  .get("http://localhost:5000/doctorProfile/allDoctors")
  .then((response)=>{
    setDoctors(response.data)
    console.log(response.data);
  })
  .catch((error)=>{
    console.error(error);
  })
}, [])



  return (
   <section>
    {doctors.map((doctor, index) => {
            return(
<div className="profile-container">

<div className="cover">
  <img src={doctor.cover_img} alt="Cover Image"/>
</div>

<div className="profile">
  <div className="profile-pic">
    <img src={doctor.profile_img} alt="Profile Picture"/>
  </div>

  <div className="profile-info">
    <h1>{doctor.fullname}</h1>
    <p>Specialty: {doctor.speciality}</p>
    <p>Email: {doctor.email}</p>
    <p>Phonenumber: {doctor.phonenumber}</p>
    <p>Address: {doctor.address}</p>
    <p>ID Card Number: {doctor.cin}</p>
  </div>
  
</div>
</div>
 )
}
)
}
   </section>
  )
}

export default Profile

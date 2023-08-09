"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


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

export default function Page() {
    const router = useRouter();
    const { id } = router.query;
    const [doctor, setDoctor] = useState<doctor | null>(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchDoctorProfile = async () => {
        if (!id) return; // 
  
        try {
          const response = await fetch(`http://localhost:5000/profile/${id}`);
          console.log(response);
          
          if (!response.ok) {
            throw new Error('Failed to fetch doctor profile');
          }
          const doctorData = await response.json();
          setDoctor(doctorData.data);
          console.log("response",doctorData)
          console.log(doctorData.data)
        } catch (error) {
          console.log(error);
          
        }
      };
  
      fetchDoctorProfile();
    }, [id]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!doctor) {
      return <div>Loading...</div>;
    }
    
  return (
    <div>
    <h1>Doctor Profile</h1>
    <p>Name: {doctor.fullname}</p>
    this you new compte
    {/* Display other doctor profile information */}
  </div>
  )
}

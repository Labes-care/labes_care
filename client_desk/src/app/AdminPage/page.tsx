
'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';


interface doctor {
  id:number,
  fullname: string,
  email:string,
  password: string,
  speciality: string,
  cin: string,
  phonenumber: string,
  profile_img : string,
  cover_img: string,
  address:string,
  certificate_img:string
  }

export default function Page() {

  const [pendingDoctors, setPendingDoctors] =  useState<doctor[]>([]);

  
  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3003/admin/getPendingDoctor');
      setPendingDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveDoctor=async (id: number)=>{
try{
  const response = await axios.put(`http://localhost:3003/admin/approveDoctor/${id}`);
  console.log(response.data.message);
  fetchPendingDoctors();
} catch (error) {
  console.error(error);
}

  }

  const rejectedDoctor=async (id: number)=>{
    try{
      const response = await axios.put(`http://localhost:3003/admin/rejectedDoctor/${id}`);
      console.log(response.data.message);
      fetchPendingDoctors();
    } catch (error) {
      console.error(error);
    }
    
      }

  return (
    <div>
    <h1>Pending Doctors</h1>
    <ul>
      {pendingDoctors.map((doctor) => (
        <li key={doctor.id}>
          <div>Name: {doctor.fullname}</div>
          <div>Email: {doctor.email}</div>
          <img src={doctor.certificate_img} alt="image" />
          <img src={doctor.cin} alt="image" />
          <button onClick={() => approveDoctor(doctor.id)}>Approve</button>
          <button onClick={() => rejectedDoctor(doctor.id)}>Reject</button>
        </li>
      ))}
    </ul>
  </div>
  )
}

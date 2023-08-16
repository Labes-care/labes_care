"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from "@mindinventory/result-doughnut-chart";

interface doctor {
    id: Number,
    fullname: string,
    email: string,
    password: string,
    speciality: string,
    cin: string,
    phonenumber: string,
    profile_img: string,
    cover_img: string,
    address: string,
    skills: string,
    biography: string,
    education: string,
    experience: string,
    
  }


function AdminDashboard() {
    const [doctors, setDoctors] = useState<doctor[]>([])
    const [refresh,setRefresh]= useState(false)
    const [patients,setPatients]=useState([])
    const [appointments,setAppointments]= useState([])

    //Doctor List
    useEffect(() => {

        axios.get(`http://localhost:3003/adminDashboard/DoctorList`)
          .then((response) => {
            setDoctors(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          })
      }, [refresh])

    //Patient List
      useEffect(() => {

        axios.get(`http://localhost:3003/adminDashboard/PatientList/`)
          .then((response) => {
            setPatients(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          })
      }, [refresh])
    // Appointment List
      useEffect(() => {

        axios.get(`http://localhost:3003/adminDashboard/appointmentList/`)
          .then((response) => {
           setAppointments(response.data)
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          })
      }, [refresh])
    

    const apiData = {
        firstChartDataSetLabel: "N",
        secondChartDataSetLabel: "N",
        firstChart: [
          {
            name: "Doctors",
            backgroundColor: "rgba(150,182,197,0.2)",
            borderColor: "rgba(150,182,197,1.000)",
            data: doctors.length,
            secondChartData: [doctors.length, doctors.length],
            secondChartCenterText: doctors.length+ " Mem",
          },
          {
            name: "Patients",
            backgroundColor: "rgba(218,192,163,0.2)",
            borderColor: "rgba(218,192,163,1.000)",
            data: patients.length,
            secondChartData: [patients.length, patients.length],
            secondChartCenterText: patients.length+ " Mem",
          },
          {
            name: "Appointments",
            backgroundColor: "rgba(212,226,212,0.2)",
            borderColor: "rgba(212,226,212,1.000)",
            data: appointments.length,
            secondChartData: [appointments.length, appointments.length],
            secondChartCenterText: appointments.length+ " Mem",
          },
        
        ],
        secondChart: [
          {
            name: "Old Members",
            backgroundColor: "rgba(255,202,204,0.2)",
            borderColor: "rgba(255,202,204,1.000)",
          },
          {
            name: "New Members",
            backgroundColor: "	rgba(161,204,209,0.2)",
            borderColor: "	rgba(161,204,209,1.000)",
          },
        
        ],
        firstChartTipTitle: "Selected Section:",
        secondChartTipTitle: "Result summary:",
        tipData: [
          {
            firstChartTip: "Doctors",
            secondChartTip: "There are "+doctors.length+ " old and new members of Doctors.",
          },
          {
            firstChartTip: "Patients",
            secondChartTip: "There are "+patients.length+ " old and new members of Patients.",
          },
          {
            firstChartTip: "Appointments",
            secondChartTip: "There are "+appointments.length+ " old and new members of Appointments.",
          },
      
        ],
        labelExtraData: "Result",
        extraData: [
          {
            Section: "Doctors",
            summary: "30% students pass with distinction grade in 2022.",
            
          },
          {
            Section: "Patients",
            summary: "15% students pass with first grade in 2022.",
            
          },
          {
            Section: "Appointments",
            summary: "15% students pass with first grade in 2022.",
            
          },
        
        ],
      };



  return (
   <section>

    <div className='chart'>
      <Chart data={apiData} />
    </div>

    <div>

    </div>

    </section>
  )
}

export default AdminDashboard

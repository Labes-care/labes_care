
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

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
}

function Profile() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<doctor[]>([])
  const [view, setView] = useState('Info')



  useEffect(() => {

    axios.get(`http://localhost:5000/doctorProfile/AllDoctors`)
      .then((response) => {
        setDoctors(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])



  return (
    <section>
      {/* {doctors.map((doctor) => {
        return (
          <div className="profile-container" >

            <div className="cover">
              <img src={doctor.cover_img} alt="Cover Image" />
            </div>

            <div className="profile">
              <div className="profile-pic">
                <img src={doctor.profile_img} alt="Profile Picture" />
              </div>

              <div className="profile-info">
                <h1>{doctor.fullname}</h1>
                <p>Specialty: {doctor.speciality}</p>
                <p>Email: {doctor.email}</p>
                <p>Phonenumber: {doctor.phonenumber}</p>
                <p>Address: {doctor.address}</p>
                <p>ID Card Number: {doctor.cin}</p>
              </div>

              <button className="edit" type="button"><span className="edit-icon"></span><span>Edit</span></button>
                 
            </div>
          </div>
        )
      }
      )
      } */}

      <div className="container">

        <div className='grid'>
          <div className="card-profile">
            <img className="cover-pic" src="coverpic.png" alt="Cover Picture" />
            <img className="profile-pic" src="doctor.avif" alt="Profile Picture" />
            <h1>Dr. Emily Roberts</h1>
            <p>Cardiologist</p>
          </div>

          <div className='card-skills'>
            <h1>Skills</h1>
            <p>As a cardiologist, I am good in Problem-solving, Team work and Leadership</p>
          </div>

        </div>

        <div className="card">
          <div className="header">
            <button className="tab-btn" onClick={() => setView('Info')} >About Me</button>
            <button className="tab-btn active" onClick={() => setView('Settings')} >Settings</button>

          </div>

          {view === 'Info' && <div className="content" id="info-content">

            <div className="card-info">
              
                <h2>About</h2>
                <div className='info'>
                <p><strong>Full Name:</strong> Dr. Emily Roberts</p>
                <p><strong>Phone Number:</strong> (555) 123-4567</p>
                <p><strong>Email:</strong> dr.emily@example.com</p>
                <p><strong>Address:</strong> 123 Heartbeat Lane, Cityville, State, Zip Code</p>
                </div>
                <p><strong>Biography:</strong> Dr. Emily Roberts is a dedicated and compassionate cardiologist...</p>
                <p><strong>Education:</strong>
                  - Medical School: University of Medical Excellence, Citytown, State
                </p>
                <p><strong>Experience:</strong> Dr. Roberts has over 10 years of experience...</p>
              
            </div>

          </div>}



          {view === 'Settings' && <div className="content" id="settings-content">

            <div className="card-set">
              <h2>Account Settings</h2>




              <div className="user-info">

                <div className="coverpic">
                  <input type="file" id="cover-pic-input" accept="image/*"/>
                </div>
                <div className="profilepic">
                  <input type="file" id="profile-pic-input" accept="image/*"/>
                </div>

                <label className="name-input">Doctor's Name</label>
                <input type="text" id="name-input" placeholder="Enter name" />

                <label className="bio-input">E-Mail</label>
                <textarea id="bio-input" placeholder="Enter E-Mail" ></textarea>

                <label className="phone-number-input">Password</label>
                <textarea id="phone-number-input" placeholder="Enter Password" ></textarea>

                <label className="phone-number-input">Phone Number</label>
                <textarea id="phone-number-input" placeholder="Enter Phone Number"></textarea>

                <label className="phone-number-input">Address</label>
                <textarea id="phone-number-input" placeholder="Enter Address" ></textarea>

                <button className="edit" type="button"><span className="edit-icon"></span><span>Update Profile</span></button>
   
              </div>

            </div>

          </div>}

        </div>

      </div>




    </section>
  )
}


// export default Profile

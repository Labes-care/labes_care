
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
  skills: string,
  biography: string,
  education: string,
  experience: string,
  
}

function Profile() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<doctor[]>([])
  const [view, setView] = useState('Info')
  const [fileCover, setFileCover] = useState();
  const [fileProfile, setFileProfile] = useState();

  const [fullname,setFullname] = useState ('')
  const [address,setAddress] = useState ('')
  const [phonenumber,setPhonenumber] = useState ('')
  const [biography,setBiography]=useState('')
  const[experience,setExperience]=useState('')
  const[skills,setSkills]=useState('')
  const [education,setEducation]=useState('')

  const [email,setEmail] = useState ('')
  const [password,setPassword]=useState('')

  const [cover_img,setCover_img]=useState('')
  const [profile_img,setProfile_img]= useState('')

  const [refresh,setRefresh]= useState(false)


 


  useEffect(() => {

    axios.get(`http://localhost:3003/doctorProfile/AllDoctors`)
      .then((response) => {
        setDoctors(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [refresh])

    const updateAccount = function(fullname,phonenumber,address,id,biography,experience,skills,education){ 
    axios.put(`http://localhost:3003/doctorProfile/Account/${id}`,
    {fullname: fullname,
      address: address,
      phonenumber: phonenumber,
      biography: biography,
      education: education,
      experience: experience,
      skills: skills
  })
   
    .then((response)=>{
      console.log(response.data)
      setRefresh(!refresh)
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  const updateSecurity = function(email,password,id){ 
    axios.put(`http://localhost:3003/doctorProfile/security/${id}`,
    {email: email,
     password:password
  })
   .then((response)=>{
      console.log(response.data)
      setRefresh(!refresh)
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  const updateCover = function(cover_img,id){ 
    axios.put(`http://localhost:3003/doctorProfile/CoverPic/${id}`,
    {cover_img: cover_img
  })
   .then((response)=>{
      console.log(response.data)
      setRefresh(!refresh)
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  const updateProfile= function(profile_img,id){ 
    axios.put(`http://localhost:3003/doctorProfile/ProfilePic/${id}`,
    {profile_img: profile_img})
   .then((response)=>{
      console.log(response.data)
      console.log(profile_img8);
      setRefresh(!refresh)
    })
    .catch((error)=>{
      console.error(error);
    })
  }



  return (
    <section className='doc-container'>

    {doctors.map((doctor) => {
        return (

          <div className="container" >
            <div className='grid'>
              <div className="card-profile">
                <img className="cover-pic" src={doctor.cover_img} alt="Cover Picture" />
                <img className="profile-pic" src={doctor.profile_img} alt="Profile Picture" />
                <h1>{doctor.fullname}</h1>
                <p>{doctor.speciality}</p>
              </div>

              <div className='card-skills'>
                <h1>Skills</h1>
                <p>{doctor.skills}</p>

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
                    <p><strong>Full Name:</strong>{doctor.fullname}</p>
                    <p><strong>Phone Number:</strong> {doctor.phonenumber}</p>
                    <p><strong>Email:</strong> {doctor.email}</p>
                    <p><strong>Address:</strong>{doctor.address}</p>
                  </div>
                  <p><strong>Biography:</strong>{doctor.biography}</p>
                  <p><strong>Education:</strong>
                    {doctor.education}
                  </p>
                  <p><strong>Experience:</strong> {doctor.experience}</p>

                </div>

              </div>}



              {view === 'Settings' && <div className="content" id="settings-content">

                <div className="card-set">

                  <h1>Security Settings</h1>
                  <div className="user-info" >

                    <label className="bio-input">E-Mail</label>
                    <input type="text" id="name-input" placeholder="Enter E-Mail" onChange={(e)=>(setEmail(e.target.value))} />
                    <label className="phone-number-input">Password</label>
                    <input type="text" id="name-input" placeholder="Enter Password" onChange={(e)=>(setPassword(e.target.value))} />
                    <button className='changes' onClick={()=>{updateSecurity(email,password,doctor.id)}}> Save</button>
                  </div>

                  <h2>Account Settings</h2>
                  <div className="user-info">

                    <button className='saveCover' onClick={()=>{updateCover(cover_img,doctor.id)}}> Save Cover Picture </button>
                    <button className='saveCover' onClick={()=>{updateProfile(profile_img,doctor.id)}}> Save Profile Picture </button>
                    <div className="coverpic">
                      <input type="file" id="cover-pic-input" accept="image/*"onChange={(e)=>(setCover_img(e.target.value),setFileCover(URL.createObjectURL(e.target.files[0])))} />
                    
                      <img src={fileCover} />
                    </div>


                    <div className="profilepic">
                      <input type="file" id="profile-pic-input" accept="image/*" onChange={(e)=>(setProfile_img(e.target.value),setFileProfile(URL.createObjectURL(e.target.files[0])))} />
                      <img src={fileProfile} />
                    </div>

                    <label className="name-input">Doctor's Name</label>
                    <input type="text" id="name-input" placeholder="Enter name" onChange={(e)=>(setFullname(e.target.value))} />
                    <label className="phone-number-input">Phone Number</label>
                    <input type="text" id="name-input" placeholder="Enter Phone Number" onChange={(e)=>(setPhonenumber(e.target.value))} />

                    <label className="phone-number-input">Address</label>
                    <input type="text" id="name-input" placeholder="Enter Address" onChange={(e)=>(setAddress(e.target.value))}/>

                    <label className="phone-number-input">Biography</label>
                    <textarea id="phone-number-input" placeholder="Enter Biography" onChange={(e)=>(setBiography(e.target.value))} ></textarea>

                    <label className="phone-number-input">Education</label>
                    <textarea id="phone-number-input" placeholder="Enter Education" onChange={(e)=>(setEducation(e.target.value))} ></textarea>

                    <label className="phone-number-input">Experience</label>
                    <textarea id="phone-number-input" placeholder="Enter Experience" onChange={(e)=>(setExperience(e.target.value))} ></textarea>

                    <label className="phone-number-input">Skills</label>
                    <textarea id="phone-number-input" placeholder="Enter Skills" onChange={(e)=>(setSkills(e.target.value))} ></textarea>

                    <button className='changes' onClick={()=>{updateAccount(fullname,phonenumber,address,biography,education,experience,skills,doctor.id)}} >Save Changes</button>
                    {/* <button className="edit" type="button"><span className="edit-icon"></span><span>Save Changes</span></button> */}

                  </div>

                </div>

              </div>}

            </div>

          </div>


        )
      }
      )
      }

    </section>
  )
}


// export default Profile

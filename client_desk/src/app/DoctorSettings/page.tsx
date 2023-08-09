// "use client"

// import React,{useEffect,useState} from 'react'
// import axios from 'axios'

// interface doctor {
//   id: Number,
//   fullname: string,
//   email: string,
//   password: string,
//   speciality: string,
//   cin: string,
//   phonenumber: string,
//   profile_img: string,
//   cover_img: string,
//   address: string,
// }

// function Settings() {

//   const [doctors, setDoctors] = useState<doctor[]>([])
//   const [fullname,setFullname] = useState ('')
//   const [email,setEmail] = useState ('')
//   const [phonenumber,setPhonenumber] = useState ('')
//   const [address,setAddress] = useState ('')
//   const [password,setPassword]=useState('')
//   const [cover_img,setCover_img]=useState('')
//   const [profile_img,setProfile_img]= useState('')


//   useEffect(() => {

//     axios.get(`http://localhost:5000/doctorProfile/AllDoctors`)
//       .then((response) => {
//         setDoctors(response.data)
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//   }, [])

//   const updateInfo = function(fullname,email,phonenumber,address,password,cover_img,profile_img,id){ 
//     axios
//     .put(`http://localhost:5000/doctorProfile/${id}`,
//     {fullname:fullname,
//       email:email,
//     phonenumber:phonenumber,
//     address:address,
//     password:password,
//     cover_img:cover_img,
//     profile_img:profile_img
//   })
   
//     .then((response)=>{
//       console.log(response.data)
      
//     })
//     .catch((error)=>{
//       console.error(error);
//     })
//   }

//   return (
//     <section>
//      {doctors.map((doctor,index) => {
//         return (
//         <div className="doctor-profile">
       

//         <div className="user-info">
//             <label className="name-input">Doctor's Name</label>
//             <input type="text" id="name-input" placeholder="Enter name" onChange={(e)=>(setFullname(e.target.value))}/>
            
//             <label className="bio-input">E-Mail</label>
//             <textarea id="bio-input" placeholder="Enter E-Mail" onChange={(e)=>(setEmail(e.target.value))}></textarea>

//             <label className="phone-number-input">Password</label>
//             <textarea id="phone-number-input" placeholder="Enter Password" onChange={(e)=>(setPassword(e.target.value))}></textarea>

//             <label className="phone-number-input">Phone Number</label>
//             <textarea id="phone-number-input" placeholder="Enter Phone Number" onChange={(e)=>(setPhonenumber(e.target.value))}></textarea>

//             <label className="phone-number-input">Address</label>
//             <textarea id="phone-number-input" placeholder="Enter Address" onChange={(e)=>(setAddress(e.target.value))}></textarea>
           
//             <label className="phone-number-input">Cover Picture</label>
//             <textarea id="phone-number-input" placeholder="Enter Cover Picture" onChange={(e)=>(setCover_img(e.target.value))}></textarea>

//             <label className="phone-number-input">Profile Picture</label>
//             <textarea id="phone-number-input" placeholder="Enter Profile Picture"  onChange={(e)=>(setProfile_img(e.target.value))}></textarea>
           
//             <button className="update-button"  onClick={()=>{updateInfo(fullname,email,password,phonenumber,address,cover_img,profile_img,doctor.id)}}>Update Profile</button>
//         </div>
//     </div>
// )
// }
// )
// }
//     </section>
//   )
// }

// export default Settings



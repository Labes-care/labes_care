"use client"
import axios from "axios";
import { useState ,useEffect  } from "react";
import * as React from 'react';
import style  from "./page.module.css" ;
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';

interface DoctorType {
    id: number;
    address:string;
   availability:string;
   email:string;
   fullname: string;
   phonenumber: number;
   speciality:string;
  }

const  Doctor = () => {
// const [refresh,setRefreach]=useState(false)
// const handleRefresh=()=>{setRefresh(!refresh)
// }
const [data,setData]=useState<DoctorType[]>([])
// const [fullname, setfullName] = useState("");
// const [speciality, setSpeciality] = useState("");
// const [email, setEmail] = useState("");
// const [availability, setAvailability] = useState("");
// const [phonenumber, setPhonenumber] = useState("");
// const [address, setAddress] = useState("");
useEffect(()=>{

fetchdoctors ()
},[])
const fetchdoctors = () => {
    axios.get("http://localhost:5000/api/doctors/allDoctors")
    .then( (res) =>{
        console.log("data",res.data) 
        setData(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
    return (
      <Box>
         <Box

           style={{
             width: "15%",
             height: "28%",
             left: 70,
             top: 150,
             position: "absolute",
             background: "#38A9E0",
             boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
             borderRadius: 10,
           }}
         >


            <CardHeader
            title="Dr.Semi Mahsni" style={{fontWeight: '700' ,color:"white",}} align="center"

      />
      <CardMedia
        component="img"
        height="194"
        image="https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg"
        alt="Doctor's pictures"
      />
          </Box>
         <Box
       
           style={{
             width: "15%",
             height: "70%",
             left: 70,
             top:610,
             position: "absolute",
             background: "#38A9E0",
             boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
             borderRadius: 10,
           }}
         >
          {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
        style={{  
          color : "black" , 
          fontSize: 30 , 
          fontFamily: 'SF Pro Display' ,
          letterSpacing: 0.30 ,
          wordWrap: 'break-word' ,
          fontWeight: '900' ,
          marginLeft : "30%" ,
          marginTop : 100
        }}>
     Dashboard
    </Typography>
{/* </Link> */}

 {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
style={{  
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
    letterSpacing: 0.30 ,
     wordWrap: 'break-word' ,
      fontWeight: '900' ,
       marginLeft : "30%",
       marginTop : 40
        }}>
     Appointement
    </Typography>
{/* </Link> */}

      {/* <Link to="/allDoctors"> */}
<Typography variant="h1" component="h2" 
style={{  
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
    letterSpacing: 0.30 ,
     wordWrap: 'break-word' ,
      fontWeight: '900' ,
       marginLeft : "30%" ,
        marginTop : 40
        }}>
     Doctors
    </Typography>
{/*   */}

 {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
style={{  
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
    letterSpacing: 0.30 ,
     wordWrap: 'break-word' ,
      fontWeight: '900' ,
       marginLeft : "30%" ,
        marginTop : 40,
        }}>
     Patients
    </Typography>
{/* </Link> */}

 {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
style={{  
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
    letterSpacing: 0.30 ,
     wordWrap: 'break-word' ,
      fontWeight: '900' ,
       marginLeft : "30%",
        marginTop : 40,
        }}>
     Chat
    </Typography>
{/* </Link> */}

 {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
style={{ 
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
    letterSpacing: 0.30 ,
     wordWrap: 'break-word' ,
      fontWeight: '900' ,
       marginLeft : "30%" ,
        marginTop : 130,
        }}>
     Calander
    </Typography>
{/* </Link> */}

 {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
style={{  
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
    letterSpacing: 0.30 ,
     wordWrap: 'break-word' ,
      fontWeight: '900' ,
       marginLeft : "30%" ,
        marginTop : 40,
        }}>
     Contact
    </Typography>
{/* </Link> */}



 {/* <Link to="/"> */}
<Typography variant="h1" component="h2" 
style={{  
   color : "black" , 
   fontSize: 30 , 
   fontFamily: 'SF Pro Display' ,
   letterSpacing: 0.30 ,
   wordWrap: 'break-word' ,
   fontWeight: '900' ,
   marginLeft : "30%" ,
   marginTop : 40,
        }}>
     Email
    </Typography>
{/* </Link> */}

          </Box>
          <Box

style={{
  width: "78%",
  height: "13%",
  right: 80,
  top: 165,
  position: "absolute",
  background: "#38A9E0",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
  borderRadius: 10,
}}
>
</Box>
      <TableContainer component={Paper}>
      <Table sx={{ 
        minWidth: 800,
        fontSize: "18px",
        width:"60%",
        boxSizing:"border-box",
        marginTop:"18%",
        marginLeft:"25%",
        padding: "20px",
        backgroundColor:"#f6f6f6"
       }} 
       size= "medium" 
       aria-label="a dense table"
       >
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: '1000'}}>FullName</TableCell>
            <TableCell align="right" style={{fontWeight: '1000'}}>Speciality</TableCell>
            <TableCell align="right" style={{fontWeight: '1000'}}>Email&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight: '1000'}}>Availability&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight: '1000'}}>Phonenumber&nbsp;</TableCell>
            <TableCell align="right" style={{fontWeight: '1000'}}>Address&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((el) => (
            <TableRow
              key={el.fullname}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="data" style={{fontWeight: '1000'}}>{el.fullname}</TableCell>
              <TableCell align="right" style={{fontWeight: '1000'}}>{el.speciality}</TableCell>
              <TableCell align="right" style={{fontWeight: '1000'}}>{el.email}</TableCell>
              <TableCell align="right" style={{fontWeight: '1000'}}>{el.availability}</TableCell>
              <TableCell align="right" style={{fontWeight: '1000'}}>{el.phonenumber}</TableCell>
              <TableCell align="right" style={{fontWeight: '1000'}}>{el.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
)
}

export default Doctor
"use client"
import axios from "axios";
import './page.module.css';
import { useState ,useEffect  } from "react";
import * as React from 'react';
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Rate } from 'antd';
import { Pagination } from 'antd';

interface DoctorType {
    id: number;
    image:string;
    fullname: string;
    speciality:string;
   availability:string;
   email:string;
   address:string;
   phonenumber: number; 
  }

const  Doctor = () => {
const [data,setData]=useState<DoctorType[]>([])
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

 <Box sx={{
 width: "200%",
 height:"200%", 
 background:"#2c303b#212529",
 display: "grid",
 justifyContent: "start",
 gridTemplateColumns: "repeat(3, 15%)",
 marginTop:"8%"
 }}>
{data.map(el=>{
    return(
<Card key={el.id}
sx={{ 
            display: 'flex' ,
            background: "", 
            width: "95%",
            height: "120%",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
            borderRadius: 9,
            spacebetween:-100,
            marginLeft: 100,
            marginTop:6,
            top:100
       }}>
        <CardMedia
        component="img"
        sx={{ 
            width: "40%",
            height:"80%",
            borderRadius: 5,
            marginLeft:"5%",
            marginTop:"5%"
        }}
        image="https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
        alt="Picture of the doctor"
      />
  
      <Box sx={{
        display: 'flex',
         flexDirection: 'column',
         marginLeft: 5,
         marginTop:6,
          }}>
        <CardContent
         sx={{
             flex: '1 0 auto' 
             }}>

          <Typography component="div" variant="h5"
          sx={{ 
            fontSize: '40px',
            color:'#a2a8d3'

            }}>
          {el.fullname}
          </Typography>
          <Typography component="div" variant="h5"
          sx={{ 
            fontSize: '40px' 
            }}>
          {el.speciality}
          </Typography>
          <Rate
     disabled defaultValue={4} 
     />
          <Typography component="div" variant="h5"
          sx={{ 
            fontSize: '40px'
           }}>

             {el.availability}
          </Typography>
          <Typography component="div" variant="h5" 
          sx={{ 
            fontSize: '40px' 
            }}>
          {el.phonenumber}
          </Typography>
          <Typography component="div" variant="h5" 
          sx={{ 
            fontSize: '40px' 
            }}>
          {el.email}
          </Typography>
        
          </CardContent>
      
      </Box>
    </Card>
    )
        })
    }

    <Box  sx={{ 
            marginTop:'50%',
            marginLeft:'50%',
           }} >
     <Pagination defaultCurrent={1} total={100} />
     </Box>
    </Box>
 )
}
export default Doctor
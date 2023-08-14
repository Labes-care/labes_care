"use client"
import axios from "axios";
import { useState ,useEffect  } from "react";
import * as React from 'react';
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Rate } from 'antd';
import { Pagination } from 'antd';
import { SpaceContext } from "antd/es/space";

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
    axios.get("http://localhost:3003/api/doctors/allDoctors")
    .then( (res) =>{
        console.log("data",res.data) 
        setData(res.data)
    })
    
    .catch((err)=>{
        console.log(err)
    })
}

    return (
<div className='continer' style={{
  marginLeft:'-32%',
 backgroundColor:"#e7eaf6",
 top:50
 }}>
 <Box sx={{
 width: "170%",
 height:"250%", 
 display: "grid",
 justifyContent: "start",
 gridTemplateColumns: "repeat(3,10%)",
 marginRight:'-50%',
 SpaceContext:'100%',
 
 }}>
{data.map(el=>{
    return(
<Card className='carddoctor' key={el.id}
sx={{ 
            display: 'flex' ,
            width: "80%",
            height: "80%",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
            borderRadius: 9,
            spacebetween:100,
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
        }}> 
        {el.image}
        </CardMedia>
    
      
      <Box sx={{
        display: 'flex',
         flexDirection: 'column',
         marginLeft:2,
         marginTop:1,
          }}>
        <CardContent
         sx={{
             flex: '1 0 auto' 
             }}>
          <Typography component="div" variant="h5"
          sx={{ 
            fontSize: '100%',
            color:'#a2a8d3',
            }}>

          {el.fullname}
          </Typography>
          <Typography component="div" variant="h5"
          sx={{ 
            fontSize: '95%' 
            }}>
          {el.speciality}
          </Typography>
          <Rate
     disabled defaultValue={4} 
     />
          <Typography component="div" variant="h5" 
          sx={{ 
            fontSize: '95%' 
            }}>
          {el.phonenumber}
          </Typography>
          <Typography component="div" variant="h5" 
          sx={{ 
            fontSize: '85%' 
            }}>
          {el.email}
          </Typography>
          </CardContent>

      </Box>
    </Card>
    
    )
        })
    }

    </Box>
    </div>
 )
}

export default Doctor
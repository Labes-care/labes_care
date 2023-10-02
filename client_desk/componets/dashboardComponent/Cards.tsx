/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import './dashboard.css'
import { useState,useEffect } from 'react'
import { useParams } from 'next/navigation';
import Groups2Icon from '@mui/icons-material/Groups2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export default function cards() {
  
  const [colleaguesCount, setColleaguesCount] = useState(0);
  const [AppointmentCount, setAppointmentCount] = useState(0);
  const searchParams = useParams()

  useEffect(() => {
    // Fetch the colleagues count from your API
    fetch('http://localhost:3003/doctorsCount')
      .then(response => response.json())
      .then(data => setColleaguesCount(data.count))
      .catch(error => console.error('Error fetching colleagues count', error));
  }, []);

  useEffect(() => {
    // Fetch the colleagues count from your API
    fetch(`http://localhost:3003/getAppointmentCount/${searchParams.id}`)
      .then(response => response.json())
      .then(data => setAppointmentCount(data))
      .catch(error => console.error('Error fetching colleagues count', error));
  }, []);  
  
  return (
    <Grid container spacing={2} >
    <Grid item xs={12} sm={4}>
      <Card sx={{ minWidth: 275  }} className='card1'>
        <CardContent>
          <Typography sx={{ mb: 1.2 }} variant="h6">
            All Patients
          </Typography>
     
          <Typography variant="body2" className='numb' sx={{ fontSize: 30 }}>
          0
          </Typography>
        <Groups2Icon className='icons' sx={{ fontSize: 40 }}/>
        </CardContent>
        {/* <CardActions>
        <Link href="/admin/adminAllClient">
              <Button>See All</Button>
            </Link>
        </CardActions> */}
      </Card>
    </Grid>



    <Grid item xs={12} sm={4} >
      <Card sx={{ minWidth: 275  }} className='card2' >
      <CardContent>
          <Typography sx={{ mb: 1.2 }}  variant="h6" >
          Apointment
          </Typography>
          <Typography variant="body1" className='numb' sx={{ fontSize: 30 }}>
         {AppointmentCount}
          </Typography>
          <AssignmentIndIcon className='icons' sx={{ fontSize: 36 }}/>
        </CardContent>
        {/* <CardActions>
        <Link href="/admin/adminAllSeller">
              <Button>See All</Button>
            </Link>
        </CardActions> */}
      </Card>
    </Grid>



    <Grid item xs={12} sm={4} >
      <Card sx={{ minWidth: 275 }} className='card3'>
      <CardContent>
          <Typography sx={{ mb: 1.2 }}  variant="h6">
          Colleagues
          </Typography>
          <Typography variant="body2" className='numb' sx={{ fontSize: 30 }}>
          {colleaguesCount}
          </Typography>
          <Diversity3Icon className='icons' sx={{ fontSize: 40 }}/>
        </CardContent>
        {/* <CardActions>
        <Link href="/admin/adminAllProduct">
              <Button>See All</Button>
            </Link>
        </CardActions> */}
      </Card>
    </Grid>
  </Grid>
  )
}


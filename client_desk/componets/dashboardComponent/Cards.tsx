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

export default function cards() {
  
  const [colleaguesCount, setColleaguesCount] = useState(0);

  useEffect(() => {
    // Fetch the colleagues count from your API
    fetch('http://localhost:3003/doctorsCount')
      .then(response => response.json())
      .then(data => setColleaguesCount(data.count))
      .catch(error => console.error('Error fetching colleagues count', error));
  }, []);
  
  return (
    <Grid container spacing={2} >
    <Grid item xs={12} sm={4}>
      <Card sx={{ minWidth: 275  }} className='card1'>
        <CardContent>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
            All Patients
          </Typography>
     
          <Typography variant="body2">
          22
          </Typography>
        </CardContent>
        <CardActions>
        <Link href="/admin/adminAllClient">
              <Button>See All</Button>
            </Link>
        </CardActions>
      </Card>
    </Grid>



    <Grid item xs={12} sm={4} >
      <Card sx={{ minWidth: 275  }} className='card2' >
      <CardContent>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
          Apointment
          </Typography>
          <Typography variant="body2">
           22
          </Typography>
        </CardContent>
        <CardActions>
        <Link href="/admin/adminAllSeller">
              <Button>See All</Button>
            </Link>
        </CardActions>
      </Card>
    </Grid>



    <Grid item xs={12} sm={4} >
      <Card sx={{ minWidth: 275 }} className='card3'>
      <CardContent>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
          Colleagues
          </Typography>
          <Typography variant="body2">
          {colleaguesCount}
          </Typography>
        </CardContent>
        <CardActions>
        <Link href="/admin/adminAllProduct">
              <Button>See All</Button>
            </Link>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
  )
}


'use client'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import './cards.css'

export default function cards() {
  
  
  return (
    <Grid container spacing={2}>
    <Grid item xs={12} sm={4}>
      <Card sx={{ minWidth: 275 , backgroundColor: '#b9a29b1f' }}>
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



    <Grid item xs={12} sm={4}>
      <Card sx={{ minWidth: 275 ,backgroundColor: '#b9a29b1f' }}>
      <CardContent>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
           seller
          </Typography>
          <Typography variant="body2">
           Apointment
          </Typography>
        </CardContent>
        <CardActions>
        <Link href="/admin/adminAllSeller">
              <Button>See All</Button>
            </Link>
        </CardActions>
      </Card>
    </Grid>



    <Grid item xs={12} sm={4}>
      <Card sx={{ minWidth: 275 , backgroundColor: '#b9a29b1f' }}>
      <CardContent>
          <Typography sx={{ mb: 1.2 }} color="text.secondary">
          Colleagues
          </Typography>
          <Typography variant="body2">
           22
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


'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme()

export default function Page() {
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [speciality, setspeciality] = useState('');
  const [cin, setcin] = useState('');
  const [certificate_img, setcertificate_img] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [error, setError] = useState('');

  const handlefullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfullname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlespecialityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setspeciality(e.target.value);
  };

  const handlecinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcin(e.target.value);
  };

  const handlecertificate_imgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcertificate_img(e.target.value);
  };

  const handlephonenumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setphonenumber(e.target.value);
  };
  const handleaddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setaddress(e.target.value);
  };
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/doctor/signup', {
        fullname,
        email,
        password,
        speciality,
        cin,
        certificate_img,
        phonenumber,
        address,

      });
      if (response.status === 201) {
        console.log('Signup successful')
        window.location.href = '/doctor'
      } else {
        console.log('Signup failed');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      fullname: data.get('fullname'),
      email: data.get('email'),
      password: data.get('password'),
      speciality: data.get('speciality'),
      cin: data.get('cin'),
      certificate_img: data.get('certificate_img'),
      phonenumber: data.get('phonenumber'),
      address: data.get('address'),
    });
  };

  return (
    
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="fullname"
                    name="fullname"
                    autoComplete="fullname"
                    autoFocus
                    value={fullname}
                    onChange={handlefullnameChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cin"
                    label="cin"

                    id="cin"
                    value={cin}
                    onChange={handlecinChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="certificate_img"
                    label="certificate_img"
                    id="certificate_img"
                    value={certificate_img}
                    onChange={handlecertificate_imgChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phonenumber"
                    label="phonenumber"
                    id="phonenumber"
                    value={phonenumber}
                    onChange={handlephonenumberChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    label="address"
                    id="address"
                    value={address}
                    onChange={handleaddressChange}
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="speciality"
                  label="speciality"
                  select
                  id="speciality"
                  value={speciality}
                  onChange={handlespecialityChange}
                >
                  <MenuItem value="Neurology">Neurology</MenuItem>
                  <MenuItem value="Cardiology">Cardiology</MenuItem>
                  <MenuItem value="Dermatology">Dermatology</MenuItem>
                  <MenuItem value="dentistry">dentistry</MenuItem>
                  <MenuItem value="orthopedic">orthopedic</MenuItem>
                  <MenuItem value="ophthalmology">ophthalmology</MenuItem>
                  <MenuItem value="Pulmonology">Pulmonology</MenuItem>
                </TextField>
              </Grid>
              
            </Grid>
          
            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleRegister}
                            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="/Login" variant="body2">
                            {'Already have an account? Sign In'}
                        </Link>
              </Grid>
            </Grid>
          
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  
  )
}


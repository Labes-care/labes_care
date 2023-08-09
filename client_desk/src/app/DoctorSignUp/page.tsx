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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import { Input } from '@mui/material';



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

interface Props {
  doctorId: number;
}

const defaultTheme = createTheme()

const steps = ['FirstStep', 'SecondStep', '3thStep'];

export default function Page({ doctorId }: Props) {
  const [fullname, setfullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [speciality, setspeciality] = useState('');
  const [cin, setcin] = useState('');

  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [certificateImg, setCertificateImg] = useState<null | File>(null);

  const router = useRouter()



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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCertificateImg(e.target.files[0]);
    }
  };

  const handlephonenumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setphonenumber(e.target.value);
  };
  const handleaddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setaddress(e.target.value);
  };
  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('speciality', speciality);
      formData.append('cin', cin);
      if (certificateImg !== null) {
        formData.append('certificate_img', certificateImg);
      } 
      formData.append('phonenumber', phonenumber);
      formData.append('address', address);
  
      const response = await axios.post('http://localhost:3003/auth/doctors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      if (response.status === 201) {
        console.log('Signup successful');
        console.log(response.data.id);
  
        router.push(`/Login`);
      } else {
        console.log('Signup failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isStepOptional = (step: number) => {
    return step === 2;
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

    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">last  Step</Typography>
            );
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === 0 && (
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
          </Grid>
        </Box>
      )}


      {activeStep === 1 && (
        <><Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="cin"
                label="cin"

                id="cin"
                value={cin}
                onChange={handlecinChange} />
            </Grid><Grid item xs={12}>
              <Input type="file" inputProps={{ accept: 'image/*' }} onChange={handleImageUpload} />

            </Grid><Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phonenumber"
                label="phonenumber"
                id="phonenumber"
                value={phonenumber}
                onChange={handlephonenumberChange} />
            </Grid><Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="address"
                id="address"
                value={address}
                onChange={handleaddressChange} />
            </Grid><Grid item xs={12}>
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
        </Box><Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
        >
            Sign Up
          </Button></>

  )
}



{
  activeStep === steps.length ? (
    <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>
        All steps completed - you&apos;re finished
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleReset}>Reset</Button>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </React.Fragment>
  )
}

  </Box >
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>


  )
}


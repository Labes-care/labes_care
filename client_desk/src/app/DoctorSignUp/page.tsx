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
import { Card, CardContent, IconButton, InputAdornment, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import { Input } from '@mui/material';
import './signup.css'
import Divider from '@mui/material/Divider';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';




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
  const [cin, setcin] = useState<null | File>(null)

  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [certificateImg, setCertificateImg] = useState<null | File>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  const handlefullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfullname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(e.target.value.length >= 6);
  };

  const handlespecialityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setspeciality(e.target.value);
  };

  const handlecinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setcin(e.target.files[0]);
    }
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
      if (cin !== null) {
        formData.append('cin', cin);
      }
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
        alert('SignUp successfuly');

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

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const validateForm = () => {
    if (activeStep === 0) {
      return fullname !== '' && email !== '' && password !== '';
    } else if (activeStep === 1) {
      return cin !== null && certificateImg !== null && speciality !== '';
    } else if (activeStep === 2) {
      return phonenumber !== '' && address !== '';
    }
    return false;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [fullname, email, password, cin, certificateImg, speciality, phonenumber, address, activeStep]);

  return (
    <div className="center-container">
      <div className="float-container">
        <div className="float-child float-child1">
          <div className="centered">
            <div className="frame">
              <figure>
                <div className="image-1"></div>
                {/* Loop for image-2 */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="image-2"></div>
                ))}
              </figure>
            </div>
          </div>
        </div>

        <div className="float-child float-child2">
          <div className="centered">
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
                              variant="standard"
                              autoComplete="fullname"
                              autoFocus
                              value={fullname}
                              onChange={handlefullnameChange}
                            />
                         
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl sx={{ m: 1, width: '37ch' }} variant="standard">
                            <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              variant="standard"
                              autoComplete="email"
                              autoFocus
                              value={email}
                              onChange={handleEmailChange}
                              error={!isEmailValid}
                              helperText={isEmailValid ? '' : 'Veuillez saisir une adresse e-mail valide.'}
                            />
                          </FormControl>
                        </Grid>
                        <FormControl sx={{ m: 1, width: '37ch' }} variant="standard" error={!isPasswordValid}>
                          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                          <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handlePasswordChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {!isPasswordValid && <FormHelperText>Veuillez saisir une password valide.</FormHelperText>}
                        </FormControl>
                      </Grid>
                    </Box>
                  )}


                  {activeStep === 1 && (
                    <><Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid>
                        <Grid item xs={12}>
                          <label htmlFor="cin" className="file-input-label">
                            Upload Cin Images Recto
                            <input
                              type="file"
                              id="cin"
                              name="cin"
                              accept="image/*"
                              onChange={handlecinChange}
                              required
                            />
                          </label>
                        </Grid>
                        <br />

                        <Grid item xs={12}>
                          <label htmlFor="cin" className="file-input-label">
                            Upload your certeficate
                            <input type="file"
                              id="certificate_img"
                              name="certificate_img"
                              accept="image/*"
                              onChange={handleImageUpload}
                              required
                            />
                          </label>
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
                    </Box></>

                  )
                  }

                  {activeStep === 2 && (
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phonenumber"
                            label="phonenumber"
                            variant="standard"
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
                            variant="standard"
                            id="address"
                            value={address}
                            onChange={handleaddressChange} />
                        </Grid>
                      </Grid>
                    </Box>
                  )
                  }

                  {
                    activeStep === steps.length ? (
                      <React.Fragment>
                        <br />
                        <br />

                        <br />

                        you will recieve an email

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Box sx={{ flex: '1 1 auto' }} />

                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>

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

                          {activeStep === steps.length - 1 ? <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                            disabled={!(activeStep === steps.length - 1 && isFormValid)}
                          >
                            Sign Up
                          </Button> : <Button
                            disabled={!(isFormValid)}
                            onClick={handleNext}>
                            Next
                          </Button>}

                        </Box>
                      </React.Fragment>
                    )
                  }

                </Box >

              </Container>
            </ThemeProvider>
          </div>
          <Copyright sx={{ mt: 5 }} className='copyright' />
        </div>
      </div>

    </div>

  )
}


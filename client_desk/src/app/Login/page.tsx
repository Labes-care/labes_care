"use client"
import { useState } from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/navigation';
import '../DoctorSignUp/signup.css'



import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';


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

const defaultTheme = createTheme();

export default function Page() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/auth/doctor/login', {
        email,
        password,
      });
      console.log(response);



      if (response.status === 200) {

        const { id, token,approvalStatus, paymentStatus } = response.data

        if (approvalStatus === 'Pending approval') {
          alert('Please wait for admin approval before logging in.');
          return;
        }

        if (paymentStatus === 'Payment required') {
          // Redirect to payment page
          router.push(`/doctorPayment/payment/${id}`); // Adjust the URL as needed
          return;
        }

        // Store the token in a cookie
        Cookies.set('token', token);

        console.log('Login successful');

        if (id) {


          router.push(`/DoProfile/${id}`);


        }

      } else if (response.status === 401) {
        alert('Invalid email or password. Please check your credentials.');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        alert('Invalid email or password. Please check your credentials.');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordValid(event.target.value.length >= 6);
  };
 
  return (

        <div className="form_main">
          <div>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs" className='contanair'>
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                    {/* <button onClick={()=>{handleSubmit()}}>post</button> */}

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="standard"
                      autoFocus
                      value={email}
                      onChange={handleEmailChange}
                      error={!isEmailValid}
                      helperText={isEmailValid ? '' : 'Veuillez saisir une adresse e-mail valide.'}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      variant="standard"
                      value={password}
                      onChange={handlePasswordChange}
                      error={!isPasswordValid} // Apply error style
                      helperText={isPasswordValid ? '' : 'Veuillez saisir une password valide.'}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign in
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="DoctorSignUp" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
          <Copyright sx={{ mt: 5 }} className='copyright' />
              </Container>
            </ThemeProvider>
          </div>
        </div>
  )
}
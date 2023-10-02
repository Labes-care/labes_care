import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import './dashboard.css'
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';


interface apointment{
  id: number,
  date: number,
  time: number,
  message: string,
  Patient: {
    fullname: string,
    profile_img: string,
    gender:string
  }
}


export default function TableAppointment() {
  const [appointments, setAppointments] = useState<apointment[]>([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  const searchParams = useParams()

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    if (!searchParams.id) return
    try {
      const response = await axios.get(`http://localhost:3003/appointment/${searchParams.id}`); // Replace with your API endpoint
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  return (
      <Box className='tableContainer black-background'>
        <TableContainer  className='table' component={Paper} sx={{ background: '#fff' }}>
        <Table  sx={{ minWidth: 850 }} aria-label="simple table">
        <h3 className='headerLine'>Appointment</h3>
          <TableHead>
            <TableRow>
              <TableCell >#</TableCell>
              <TableCell  align="left">Patient Name</TableCell>
              <TableCell  align="left">gender</TableCell>
              <TableCell  align="left">date</TableCell>
              <TableCell  align="left">time</TableCell>
              <TableCell  align="left">message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((apoi) => (
              <TableRow
                key={apoi.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <img src={apoi.Patient.profile_img} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell align="left"> {apoi.Patient.fullname}</TableCell>
                <TableCell  align="left">{apoi.Patient.gender}</TableCell>
                <TableCell  align="left">{apoi.date}</TableCell>
                <TableCell  align="left">{apoi.time}</TableCell>
                <TableCell  align="left"><button role="button" className="button-name" aria-describedby={id} type="button" onClick={handleClick}>
          click here
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
              {apoi.message}
              </Box>
            </Fade>
          )}
        </Popper></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
  )
}

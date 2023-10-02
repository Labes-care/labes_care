import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import './dashboardComponent/global.css'
import Image from 'next/image';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface apointment {
  id: number,
  date: number,
  time: number,
  message: string,
  checked: number,
  patients_idpatients: number,
  Patient: {
    id: number
    fullname: string,
    profile_img: string,
    gender: string
    birthday: number
    email: string
    address: string
  }
}

export default function Appointment() {
  const [appointments, setAppointments] = useState<apointment[]>([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState<number[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // Step 1
  const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState<apointment | null>(null);

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

  const handleAccept = async (patients_idpatients: number) => {
    try {
      await axios.put(`http://localhost:3003/updateAppointmentChecked/${searchParams.id}`, { patients_idpatients });
      setAcceptedAppointments((prevAccepted) => [...prevAccepted, patients_idpatients]);

      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment checked value:', error);
    }
  };

  const handleDetailsOpen = (appointment: apointment) => {
    setIsDetailsOpen(true); // Step 2
    setSelectedAppointmentDetails(appointment); // Step 2
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };

  return (
    <div>
      <h2 className='fileplace'>Doctor Dashboard <ArrowForwardIosIcon /> <AssignmentIndIcon /> Appointment </h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">#</StyledTableCell>
              <StyledTableCell align="right">Patient Name</StyledTableCell>
              <StyledTableCell align="right">Gendre</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Message</StyledTableCell>
              <StyledTableCell align="right">Approval</StyledTableCell>
              <StyledTableCell align="right">Details</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align="right">
                  <img src={row.Patient.profile_img} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />

                </StyledTableCell>
                <StyledTableCell align="right">{row.Patient.fullname}</StyledTableCell>
                <StyledTableCell align="right">{row.Patient.gender}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                <StyledTableCell align="right">{row.message}</StyledTableCell>
                <StyledTableCell align="right">
                  {acceptedAppointments.includes(row.patients_idpatients) ? (
                    'Accepted'
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAccept(row.patients_idpatients)}
                    >
                      Accept
                    </Button>
                  )}                </StyledTableCell>

                <StyledTableCell align="right"><Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDetailsOpen(row)}
                >
                  details
                </Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isDetailsOpen && selectedAppointmentDetails && (
        <div className="overlay">
          <div className="card">
            <img src={selectedAppointmentDetails.Patient.profile_img} alt="Profile" className='img' />
            <span>About {selectedAppointmentDetails.Patient.fullname}</span>
            <div className='info'>
          <h3>Email : {selectedAppointmentDetails.Patient.email}</h3>
          <h3>Birthday : {selectedAppointmentDetails.Patient.birthday}</h3>
          <h3>Gender : {selectedAppointmentDetails.Patient.gender}</h3>
          <h3>Address : {selectedAppointmentDetails.Patient.address}</h3>
            </div>
            <div className="share">

            </div>
            <button onClick={handleDetailsClose}>exit</button>
          </div>
        </div>
      )}

    </div>
  );
}










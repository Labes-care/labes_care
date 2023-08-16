import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function createData(
  image:string,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { image,name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('pdp','Frozen yoghurt', 159, 6.0, 24,23),
    createData('pdp','Ice cream sandwich', 237, 9.0, 37,56),
    createData('pdp','Eclair', 262, 16.0, 24,78),
    createData('pdp','Cupcake', 305, 3.7, 67,486),
    createData('pdp','Gingerbread', 356, 16.0, 49,45),
  ];

export default function TableAppointment() {
  return (
    <Box className='tableContainer'>
      Today Appointment
       <TableContainer  className='table' component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >#</TableCell>
            <TableCell  align="left">Patient Name</TableCell>
            <TableCell  align="left">gender</TableCell>
            <TableCell  align="left">Last Visit</TableCell>
            <TableCell  align="left">Carbs&nbsp;(g)</TableCell>
            <TableCell  align="left">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.image}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell  align="left">{row.calories}</TableCell>
              <TableCell  align="left">{row.fat}</TableCell>
              <TableCell  align="left">{row.carbs}</TableCell>
              <TableCell  align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}

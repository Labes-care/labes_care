import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import './dashboard.css'
import { Typography } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import 'animate.css/animate.min.css'; 
import {  pieArcClasses } from '@mui/x-charts/PieChart';
  

export default function Piechart() {
  const [MalePatient, setMalePatient] = useState(0);
  const [FelMalePatient, setFelMalePatient] = useState(0);

  const searchParams = useParams()

  useEffect(() => {
    
    fetch(`http://localhost:3003/getMalePatient/${searchParams.id}`)
      .then(response => response.json())
      .then(data => setMalePatient(data.count))
      .catch(error => console.error('Error fetching colleagues count', error));
  }, []);

  useEffect(() => {
    
    fetch(`http://localhost:3003/getFemalePatient/${searchParams.id}`)
      .then(response => response.json())
      .then(data => setFelMalePatient(data.count))
      .catch(error => console.error('Error fetching colleagues count', error));
  }, []);

  return (
      <Box className='Piechart'>
         
         <h3 className='headerLine'>Number Of Patient</h3>
    <PieChart
    
    className='animate__animated animate__fadeIn'
      series={[
        {
          data: [
            { id: 0, value:MalePatient, label: 'male' ,color: '#3498db'},
            { id: 1, value:FelMalePatient, label: 'female',color: '#e74c3c' },
          
          ],
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        },
      ]}
      sx={{
        [`& .${pieArcClasses.faded}`]: {
          fill: 'gray',
        },
      }}
      width={500}
      height={350}
    />
       <Typography className='totalPie' variant="overline">Total :</Typography>
       <Typography className='numberPie' variant="overline"> {MalePatient+FelMalePatient}</Typography>
    </Box>
  );
}
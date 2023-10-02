import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './dashboard.css'
import { Box } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import './global.css'


export default function BasicArea() {
  const [oldPatientCount, setOldPatientCount] = useState(0);
  const [newPatientCount, setNewPatientCount] = useState(0);

  const searchParams = useParams();

  useEffect(() => {
    fetch(`http://localhost:3003/getOldNewPatient/${searchParams.id}`)
      .then(response => response.json())
      .then(data => {
        setOldPatientCount(data.oldPatients);
        setNewPatientCount(data.newPatients);
      })
      .catch(error => console.error('Error fetching patient counts', error));
  }, []);

  return (
    <Box className='chart'>
      <h2 className='headerLine'>Patients Survay</h2>
    <LineChart
    className='line'
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          label: 'new Patient',
          data: [0,0,0,0,0,0],
          area: false,
          color:'#e74c3c'
        },
        {
          label: 'old patient',
          data: [0,0,0,0,0,0],
          area: false,
        },
      ]}
     
      sx={{
        '--ChartsLegend-itemWidth': '200px',
      }}
      width={990}
      height={400}
      margin={{ left: 60 }}
    />
    </Box>
  );
}
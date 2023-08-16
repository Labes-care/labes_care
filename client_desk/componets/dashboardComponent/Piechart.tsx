import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import './dashboard.css'
import { Typography } from '@mui/material';

export default function Piechart() {
  return (
      <Box className='Piechart'>
         

    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'male' },
            { id: 1, value: 15, label: 'female' },
          
          ],
        },
      ]}
      width={500}
      height={350}
    />
    </Box>
  );
}
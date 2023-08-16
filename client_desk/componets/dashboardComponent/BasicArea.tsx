import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import './dashboard.css'
import { Box } from '@mui/material';

export default function BasicArea() {
  return (
    <Box className='chart'>
      
    <LineChart
    className='line'
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          label: 'new Patient',
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
        {
          label: 'old patient',
          data: [2, 5, 7, 4.5, 3.5, 1],
          area: true,
        },
      ]}
      sx={{
        '--ChartsLegend-itemWidth': '200px',
      }}
      width={990}
      height={400}
      margin={{ left: 70 }}
    />
    </Box>
  );
}
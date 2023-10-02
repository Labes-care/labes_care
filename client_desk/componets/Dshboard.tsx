import React from 'react'
import Cards from './dashboardComponent/Cards'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableAppointment from './dashboardComponent/Table';
import  TodoList  from './dashboardComponent/TodoList';
import BasicArea from './dashboardComponent/BasicArea';
import Box from '@mui/material/Box';
import Piechart from './dashboardComponent/Piechart';
import DoctorList from './dashboardComponent/DoctorList';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';

export default function Dshboard() {
  return (
    <div className='dashboard'>
      <h2 className='fileplace'>Doctor Dashboard <ArrowForwardIosIcon/> <HouseOutlinedIcon/> Dashboard </h2>
    <div>
      
   <Cards />
    </div>
    <Box>
      <BasicArea/>
      <Piechart/>
      </Box>
    <div>
      <DoctorList/>
   <TableAppointment/>
   </div>
   <TodoList/>
   </div>
  )
}

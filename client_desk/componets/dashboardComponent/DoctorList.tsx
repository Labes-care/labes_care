/* eslint-disable @next/next/no-img-element */
'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './dashboard.css'
import { Box } from '@mui/material';
import { useState,useEffect } from 'react'
import Button from '@mui/material/Button';


interface Column {
    id: 'profile_img' |'fullname' | 'availability';
    label: string|number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'profile_img', label: '#'},
    { id: 'fullname', label: 'Doctor Name'  },
    { id: 'availability', label: 'Status' },
  ];
interface doctor {
    id: number,
    fullname: string,
    email: string,
    password: string,
    speciality: string,
    cin: string,
    phonenumber: string,
    profile_img: string,
    cover_img: string,
    address: string,
    certificate_img: string
    availability:number
}

export default function DoctorList() {
    const [doctors, setDoctors] = useState<doctor[]>([]);
    
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3003/doctors');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);
    return (
        

        <Paper className='paper' sx={{ width: '35%', overflow: 'hidden', background: '#fff', border: 'none', color: '#fff', boxShadow: '0 0 10px #86868633' }}>
            <h3 className='titli' >Doctors List</h3>
        <TableContainer className='tablecontainer'  sx={{ maxHeight: 440, background: 'transparent' }}>
          <Table className='tablecontainer' stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow  className='columns' >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{  background: '#adadad !important' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {doctors.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ color: 'black' }}>
                <TableCell align="center">
                  <img src={row.profile_img} alt={row.fullname} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell align="center">{row.fullname}</TableCell>
                <TableCell key="availability" align="center">
                    {row.availability === 0 ? (
                     <Button variant="outlined" color="success">
                     Available
                   </Button>
                    ) : (
                      <Button variant="outlined" color="error">
                      Absend
                    </Button>
                    )}
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
       
      </Paper>

    );
}



'use client';
import  { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import * as React from 'react';

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';



interface appoitment{
  message: string,
  time: number,
  id: number,
  Patient:{ fullname: string;
    gender: string;
    birthday: string;
    email: string;
    address: string;
    profile_img: string;}
}

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};


export default function Appointment(): React.JSX.Element {
  const [data, setData] = useState<appoitment[]>([]);

  const searchParams = useParams();
  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:3003/appointment/${searchParams.id}`);

      const data = await response.json();
      console.log(data);
      
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  useEffect(() => {
    fetchData();

  }, []);
  return (
    <div>
      Appointment
    </div>
  );
};


'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './dashboard.css'
import { Box } from '@mui/material';
import { useState,useEffect } from 'react'

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
}

export default function DoctorList() {
    const [doctors, setDoctors] = useState<doctor | null>([]);

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
        <Box className="DoctorList">
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {doctors.map((doctor) => (
                    <React.Fragment key={doctor.id}>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar alt={doctor.fullname} src={doctor.profile_img} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={doctor.fullname}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {doctor.speciality}
                                        </Typography>
                                        {" — " + doctor.email}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}
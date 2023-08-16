'use client'
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import  {Dshboard}  from '../../../../componets';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './doprofil.css'
import { CardMedia } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
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
  certificate_img:string
}
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Page() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [doctor, setDoctor] = useState<doctor | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [activeContent, setActiveContent] = useState('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const searchParams = useParams()



  console.log(searchParams.id);
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!searchParams.id) return
      try {
        const response = await fetch(`http://localhost:3003/DoProfile/${searchParams.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch doctor profile');
        }
        const doctorData = await response.json();
        setDoctor(doctorData);
        console.log("response", doctorData.Doctor)

      } catch (err) {
        setError(error);

      }
    };

    fetchDoctorProfile();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className='doprofile'>
    <Box sx={{ display: 'flex',backgroundColor: '#f0f3fb' }}  >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
        <IconButton
  color="inherit"
  aria-label="toggle drawer"
  onClick={() => setOpen(!open)}
  edge="start"
  sx={{
    marginRight: 5,
  }}
>
  {open ? <ChevronLeftIcon /> : <MenuIcon />}
</IconButton>
          <Typography variant="h6" noWrap component="div">
            Labes_care
          </Typography>
          <Box className='avatar' sx={{ flexGrow: 33 }} >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="Remy Sharp" src='./' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent"
       onMouseEnter={() => setOpen(true)}
       onMouseLeave={() => setOpen(false)} 
      open={open}>
        <DrawerHeader>
        {open && (
      <CardMedia
        sx={{ height: 100, width: 100 }}
        image={doctor.certificate_img}
        title="green iguana"
        className='carteimageDashoard'
      />
    )}
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Appointments', 'Doctors', 'Patients', 'Settings', 'Chat'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 20,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        <DrawerHeader />
        {activeContent === 'Dashboard' && (
          <Typography paragraph>

            <Dshboard/>

          </Typography>
        )}

        {activeContent === 'Appointments' && (
          <Typography paragraph>
           Appointment
          </Typography>
        )}

        {activeContent === 'Doctors' && (
          <Typography paragraph>
         Doctor
          </Typography>
        )}


        {activeContent === 'Patients' && (
          <Typography paragraph>
            Patients
          </Typography>
        )}


        {activeContent === 'Settings' && (
          <Typography paragraph>
            setting
          </Typography>
        )}


        {activeContent === 'Chat' && (
          <Typography paragraph>
            chaaat
          </Typography>
        )}
      </Box>
    </Box>
    </div>
  );
}


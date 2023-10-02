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
import { Appointment, Dshboard, Setting } from '../../../../componets';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './doprofil.css'
import { CardMedia, Link } from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { Patient } from '../../../../componets';
import CalendarComponent from '../../../../componets/Calendar/Calendar';




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
  certificate_img: string
}
const settings = [
  { label: 'Logout', path: '/Login' },
];

export default function Page() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [doctor, setDoctor] = useState<doctor | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [activeContent, setActiveContent] = useState('Dashboard');

  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const router = useRouter();

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.requestFullscreen) { // Chrome, Safari, Opera
        element.requestFullscreen();
      } else if (element.requestFullscreen) { // IE/Edge
        element.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Listen for the 'keydown' event to exit fullscreen on Escape key
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (isFullscreen) {
        toggleFullscreen();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

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

  const handleMenuItemClick = (path: string) => {
    // Close the menu
    setAnchorElUser(null);

    if (path === '/Login') {
      // Navigate to the specified path
      router.push(path);
    }
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
  }, [error, searchParams.id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!doctor) {
    return <div>Loading...</div>;
  }



  return (
    <div className='doprofile'>
      <Box sx={{ display: 'flex', backgroundColor: '#f0f3fb' }}  >
        <CssBaseline />
        <AppBar className='AppBar' position="fixed" open={open}>
          <Toolbar>
            <IconButton
              background-color='#484c72'
              aria-label="toggle drawer"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{
                marginRight: 5,
              }}
            >

              {open ? <ChevronLeftIcon fontSize="large" /> : <img
                src="https://scontent.ftun8-1.fna.fbcdn.net/v/t1.15752-9/367775393_1614290428983285_8388083255744351990_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=14ujZ8WmovoAX_2qHXU&_nc_ht=scontent.ftun8-1.fna&oh=03_AdTThGpt8NWri1tFwUfgDggrexYHUQlLSI21LIXumTDQmA&oe=650F6D87"
                alt="Image Description"
                style={{
                  width: '70px', // Adjust the width as needed
                  height: 'auto', // Maintain the aspect ratio
                  verticalAlign: 'middle',
                }}
              />}
            </IconButton>
            <Typography color={'#fff'} noWrap component="div" className='labess'>
              Labes_care
            </Typography>
            <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
              <IconButton className='fullscreen' onClick={toggleFullscreen}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Tooltip>
            <div className='avatar'>
              <Box sx={{ flexGrow: 33 }} >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                    <Avatar alt="Remy Sharp" src={doctor.profile_img} />
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
                  onClose={() => handleCloseUserMenu()}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={() => handleMenuItemClick(setting.path)}>
                      <Typography textAlign="center">{setting.label}</Typography>
                    </MenuItem>
                  ))}

                </Menu>
                <Typography variant="button" className='nameAnchor'>{doctor.fullname}</Typography>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
        <div className='ssss'>
          <Drawer
            variant="permanent"

            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            open={open}
            PaperProps={{
              sx: {

                backgroundColor: "#ffffff !important",

              }
            }}
          >
            <DrawerHeader>
              {open && (
                <><CardMedia
                  sx={{ height: 100, width: 100 }}
                  image={doctor.profile_img}
                  title="green iguana"
                  className='carteimageDashoard' /><Typography className='name'>{doctor.fullname}</Typography> <Typography className='nameDoctor'>Doctor</Typography></>



              )}
            </DrawerHeader>
            <Divider />
            <List className='list'>
              {['Dashboard', 'Appointments', 'Patients', 'Settings', 'Calendar', 'Chat'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 20,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,

                    }}
                    onClick={() => setActiveContent(text)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'rgb(162, 161, 161)'
                      }}
                    >

                      {index === 2 ? (
                        <img src="data:image/png;base64,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" />
                      ) : index === 3 ? (
                        <img src="data:image/png;base64,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" />
                      ) : index === 4 ? (
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdUlEQVR4nO2Z3YrTUBDHDyv4BsuZk/VSdLcv4IV6pvXCDwoWF30CH8GPC2G9UlFB6KWypqe62kZvd+8tPoIImoh37t6LC7KgjZxDmk3aRvLdHDZ/GAYSmJlfZpI2E0Jq1SpfyyfwJAC/JX2VYsUWMPwODF3pqxQrtryEyqoUK1KUnr8ADN8Dwz1g+DeYNF/jfwBwV+ailLdIVjUajeMAvFdcwfh/AzRlDakBgHGxsOLZBIJvZhkbPxBl2GcMVwkhSxTwQB0DPEh9dSZ5IBRrCYCvUca3whBNTBzYm/lJ8a9C54A/osB/S58VACJiUcA3gVGy0gDsTQIYRut01kIT5we+FgDYTR5APhH8x9uNY9PnzYFzXVjOx57l7AvLcfM2c/DVHyFmNMe9ob2e2/NZWHa3iKLFlAVr8I49SwVQBRMeVH9gX4sJwMdVBBBDexQPANAChuPqATi/SBaVMfsi+h5QVgMIHTqwHPGioc0IQcSLhk4A7rwfshrAOkIdMFZaKr/0WgK0O/dUfum1BBCW4z7vf5o5phWAmGM1gCjpSr94/dndeLCtvJYdOHP2psovvZYAzGiq/NJrCQC6/5DBEQfgc9cqZRVvBtYqaf9K+Istb6VYKsCT7sgHOLXaSQUQWC3yrbIBLrfv+gAXr9xODiD388EZVLtKONeQrS1ybB53R+6l9p3Q/N9/uJMcQHUB0Fz0OuXq+sYMaNIPHJuLLP7l2y+h4nuW/TM2wGEnmggM31HgP+SitaiCjZWWumHlzE+PTQDgA8kiuSUu60YW8wCG3zokq+SWeCHFW85Tkpfklli2s6jvA+Kw6H2VJ48rX6sWmdE/MFHlb8njfL0AAAAASUVORK5CYII="/>                      ) : index === 5 ? (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD/klEQVR4nO2ZaWgTQRTHt14fREVt03lvc1hUqpRq0aKgNjNtrfVAPFAriAqCftEPVfFARKmiolYRb2t1o9K6sR8UERQRES8UC0K96qbUfvHAA08E75FN23ST7MYcmzaV/OERmGRm/7/ZtzNvJ4KQVFJJ6QoxtycA2wBI7wKyRqMgSC/17z+6T0D3FIKsIlS/5qB3AOhGhyOvn2CmRJGOIMAUQMbDiXSk8/z7FwwJty94g75CLMg1xXxq6tjegLQpAgMvEcc5tGNkZWX1IEhrI4NgjRYL6xUzAEFa3jooAfpWnd309LyBekEIyxCE3O4GQ6WIotNu1NfbX3TOVa/hgwC2I2aAlvxsTg2RThPiLEQ2ow2ANsQ8ICD92TqgdnYraxoGu9xKjSQrH1xuDzcrjlXX+9LIaitU29zHq5WBMQC05aXWvCR73plpXBuguWZL29uoIfQA1JmPl3mXPgCXZI9sGoDZaRMWgFt5b+IdiJ95lwGAGkkAoQPuQFb2bF9EVWp0dAqB4W4fZqmRoAA87FKjowF2H7zti6hKjURbhTDSUiPRAAQht7vm+x+dEEDQ9RQK4HPLjz+3B4AkP/WZQ7EgdgC1/idAb2nfsuIJsKX8is9c5pDpsQPoKV7my/ff5Dkj5/nMTZm+rv0AJFnhS5Yd4cNy5vrtnuGGOtso5vuM2exFfOe+GyY8A5BnAaAL1U8jgMMn6njRpJWRvO+GDKt9PF+xtjpwgv5ECcDqWjaNOj2A7Xuu8eycElOM2+xFvLC4lG/bfTX4DruV19EBhFhGS1ef4o4BE/xMzJxTxncdaNs9w429R+95VyDDZ0T2VJoGcKzqCZ9VstnPuCOjmC9fUxWnpdXzrPJ0IzEFwGplttFjFvmZzx5e4k0lg4ur786NUYWsPJRkz66K6qdp/5rUUACfNLXHRgL0nXaA4smr+JETD/TNu5XzrnNNfQWTBZEAEGBndVcKWyFfvPSQwawrv1yyUsY5TzHbfMQAaWlOJMDuaztlDp3By7ZfDDJeceoRX7/p/Mcd+29MFeIoiHQj856PApsPSHcS4lxWcfKh7syPHLXgS+uSa7EUDEoYgEC53Mrv4GVOOej3soHsDwB78e8j9aDj+VpE6hRCyIxSolZj/KtLbligtiPSmWqNHvumRn8SZOvUA+H4AMj1GZKsVEmyckaqqR8W+F8CIL1AgH2PFYQgvaQtYUwDCFNdUu1jxVDH6UFhzRtOkF33gwD6PDCl2gsgSs3pSpCVAbLfmpT6pbapk9IJAJqFmD+RIHsTmFLqeZDm7nwTElk2W6E1MKUCHva7QuKLdQNgW/1Tymv+C0A+EzqLAJyUALtMkD0GZGdM+xczqaT+M/0Fk1aZFaOnjkMAAAAASUVORK5CYII=" />
                      ) : index % 2 === 0 ? (
                        <img src="data:image/png;base64,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" />
                      ) : (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFYklEQVR4nO1ZfWwURRRfCygqGgM5duYKvSoF4SjSpJVEpDNttQUJHwocBlFUDOBH0GCAGouUGEsotUKwtTb0dtuEc5fT/uE/JgZNiRQxEat8FWYViYX4QUxIKlhqI2veXu9uune9j712D5P+kpdedmdmf7+Z9968mQrCCEYwgmGBYxLNQZj+jDC5KiJyDiHykSiSlW63+1bh/wCE6GaEqR5p5CeEyDLhJsItCJGdCNOTokgXRa5ANBFUFzGpEQQhI/0zjcnuEClEO8zvRbH0TqeT5iFEt4mYXjatxm4hnZjoJEsGEEJ0V6z248fPuVvE5BO+D8bkCSEdyMlZcBvC9DxHxi8InlEJdM0QMW3lY8KdjsBGqGg5R/4Pl4veE61d04EzLllhO2SVHZUU7RJYnff7Y1musqvcynnSIIAoHIG3zO8rK/UMSWVvywq7Lquabrann68NBzQq8tkuQMS0M0jAkVk820xeVtnH0YgHbWftlyEBU6cv7YY+tgpAmHYHCUyYMPcu/p0x8zHIgzW2nAoJyMou08HNbBZA/gqtgIOOM/l8VLfh7cPmkyEBrnvn65LKelr857NsEyAiyqK5UCBgY5M3u1DuAyuNZ5KqVdomAGobLoi3BZ9LCvs6EQHPrH0vJGDB4vKAAEVrt00AFGbhsoBehk0qIEC7FI98Q/MJfcrURSEBm8p9/e9Yl20CYPPhNzLYnGCTklV2MZ6AsoWbQ+Rnzlqhe33n+leA/SLYCagqBxZotLVe6vgmFvmafUfCZYSzSN9S4Q+/V7Qjgt2AqpIXMdlVeg38u6r2CyNVRkuf093LjLaep6oGvle0iA3RDmSYRfDmzl2uv1vXHpFCq/ceHvDM9jRqBlSVxmElioi1G+riZiVZ0bYL6YYR2Ih6oLaZNuPxbthho62A2SSFHbS9lIgHox5S2A5wjUGJq6wHZv6mI88D/BpIQoYJpFh2EX4XP/rqVwjT63AcjTcGtBER6UmkrW0QEe3tP4b2DmXbYQYdLWKyVcTk+GBZC8Ux6AtjwFhJfRqheQ6EaDUUccEZiWuIHAofF+lohEmbVeIoUsjhhEUgRAsQJr9b+hiiBTCGiEn5UJFHYRFbE5t5TH6zRj68ArzbTMTkTSsHebeRpkkFJ+DbRGa/mq864SpFEPLHJPtx3u1SuYXICdyG6AkHNX9wEZ1ksdUP8ytjdQxLYxn5N3j0c9Gxwed1/tPjZJXtghJYUtiNeKVC5qRHLPm5M7OkLzt7/mspCKBdwcYYP2wUW35/1+2yqsUsm802j2ywHKwzcz3XZPnCWKsCPg+5kEi3wDNZYRXJkAfb03BML6QvJb0Sk7NK9Rc37odi7w1LAjAuXB0OGnLF4SieIivsVLICUjVJ1U5YEgAZByGqcZHPat5vv2K7AEX706IAQYDrcRHRv4Odsu97rG/j681QBidMoEH+wTg+wl9LIhT2nWUBAEih8O8ivnP+nDU6CNl/4ExcAtA22MfaKrAPUhJgdETkQYTJBXOgZblKdVryinHyKt/eahzcm3xnBxDg21sg/2+LwmakLACAcf4dIqbvQH6OlT2m3b9Er60/OiQCJIVVD/mmmJfncXhWVXXOmv3koCJe3uQNkeDTZ5OvM4nswz71+/VRlkuJWKhsaxsNuzHkeCC7dEWlkevhrnNu4Xq93tsREQNga17Yk5AISdUaGxuPj0mpmEsEksoWSio7HYvMc+v3Wd6JUSrldKKAZfYeZKskVftMVrQ+swC4PnyocN0QCiBtSZ/KEoXXrzlk9UcPuJesaIckVeuUVO3XJt/ZnmfX7e3LK1j9jzOz5EbSM45oL7hNoKQZJvJ24z/3F9VNP40mKgAAAABJRU5ErkJggg==" />)}

                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />

          </Drawer>
        </div>
        <Box className='bodyy' component="main" sx={{ flexGrow: 1, p: 3 }} >
          <DrawerHeader />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {activeContent === 'Dashboard' && (
                <Typography paragraph>

                  <Dshboard />

                </Typography>
              )}

              {activeContent === 'Appointments' && (
                <Typography >
                  <Appointment />
                </Typography>
              )}


              {activeContent === 'Patients' && (
                <Typography paragraph>
                  <Patient />
                </Typography>
              )}


              {activeContent === 'Settings' && (
                <Typography paragraph>

                  <Setting />

                </Typography>
              )}

              {activeContent === 'Calendar' && (
                <Typography paragraph>
                <CalendarComponent/>
                               </Typography>
              )}


              {activeContent === 'Chat' && (
                <Typography paragraph>
                  sssssss
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box >
    </div >
  );
}

"use client"
import axios from "axios";
import React, { useState,useEffect } from 'react';
import './Calendar.css';
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";  
import type { DatePickerProps } from 'antd';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const currencies = [
  {
    value: 'Work',
    label: 'Work',
  },
  {
    value: 'Personal',
    label: 'Personal',
  },
  {
    value: 'Important',
    label: 'Important',
  },
  {
    value: 'Travel',
    label: 'Travel',
  },
  {
    value: 'Friends',
    label: 'Friends',
  },
];



  interface Props{
    title: string;
    category: string;
    start_date: Date;
    enddate:Date;
  }
const CalendarComponent: React.FC = (Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [data,setData]=useState([])
  const [render,setRender]=useState(false)
  // const [refresh, setRefresh] = useState<boolean>(false);
// const getAllEvents = () => {                                              
//   axios.get("http://localhost:3003/doctor/event/getAll")
//       .then((res: any) => {
//           console.log(res)
//       })
//       .catch((error :any) => {
//         console.log(error);
//       });

// }


useEffect(()=>{
  fetchevents ()

  },[])
  const fetchevents = () => {
      axios.get("http://localhost:3003/doctor/event/getAll")
      .then( (res: any) =>{
          console.log("data",res.data) 
          setData(res.data)
          setRender(!render)
          
      })
      
      .catch((error :any)=>{
          console.log(error)
      })
  }
const genrateObjDate=(type:string,content:string)=>{
return {
  type:type,
  content:content
}
}

const getListData = (value: Dayjs) => {
  const dateString = value.format("YYYY-MM-DDTHH:mm:ss").substring(0,10);
  console.log("Searching for date:", dateString);
  const events = data.filter(item =>{ 
    return item.date.substring(0,10) === dateString});
  console.log("Matching events:", events);
  return events.map(event => ({ type: 'success', content: event.title ,
 }));
};
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 7) {
    return 70;
  }
};
  const handleSubmit = () => {
    axios.post(`http://localhost:3003/doctor/event/Addevents/1`, {
     
      title:title,
      category:"work",
      date:date,
      details:details
      })
      .then((res: any) => {
          console.log(res)
      })
      .catch((error :any) => {
        console.log(error);
      });
  };
  console.log("data",title,category,date,details);
  
const handleChangeCategory = (e : any)=>{
  setCategory (e.target.value)
}
            <Box>
              <Typography
              variant="h5"
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "SF Pro Display",
                letterSpacing: 0.30,
                wordWrap: "break-word",
                fontWeight: "800",
                marginLeft: 35,
                marginTop: 20,
              }}
            >
              Category
            </Typography>
            <Select
              value={category}
              onChange={(e) => {
                handleChangeCategory(e);
                console.log(e.target.value);
              }}
              sx={{
                m: 1,
                width: "52ch",
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
              variant="standard"
            >
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personel">Personel</MenuItem>
              <MenuItem value="important">Important</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="Friends">friends</MenuItem>
            </Select>
          </Box>

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
    <div className="size">
    <div className="notes-month">
    <section>{num}</section>
    <span>number of appoitment</span>
    </div>
    </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
      {listData.map((item) => (
      <li key={item.content}>
      <Badge status={item.type as BadgeProps['status']} text={item.content} />
      </li>
      ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <Button onClick={handleOpen}> Add Event </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
         New Event
        </Typography>

<Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '47ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
 <TextField
 value={title}
 onChange={(e) => setTitle(e.target.value)}
          id="outlined-multiline-flexible"
          label="Title*"
          multiline
          maxRows={60}
        />
</div>

<TextField

          id="outlined-select-currency"
          select
          label="Category"
          defaultValue="Work"
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
</TextField>

<TextField
 value={date}
 onChange={(e) => setDate(e.target.value)}
          id="outlined-multiline-flexible"
          label="Date"
          multiline
          maxRows={60}
        />
</Box>
<textarea 
value={details}
onChange={(e) => setDetails(e.target.value)}
style={{  
  marginLeft:"5%",
  marginTop:"5%",
  width:300,
  height:100,
  maxWidth:"80%",
  maxHeight:"30%"
  }}
  placeholder='Event Details'>
</textarea>
<div>
      <Button className="button" onClick={ () => { handleSubmit()}} 
      style={{
         background: "#e4e4e4",
         marginTop:"10%",
         marginLeft:"12%",
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        viewBox="0 0 24 24"
        height="24"
        fill="none"
        className="svg-icon"
      >
        <g strokeWidth="2" strokeLinecap="round" stroke="#90a4ae">
          <rect y="5" x="4" width="16" rx="2" height="16" />
          <path d="m8 3v4" />
          <path d="m16 3v4" />
          <path d="m4 11h16" />
        </g>
      </svg>
      <span className="label" style={{color:"#90a4ae"}}>Add to Calendar</span>
    </Button>
    <Button className="button" onClick={handleClose} style={{
         background: "#f12d2d",
         marginTop:"10%",
         marginLeft:"5%",
         width:"21%",
      }}
      >
      <span className="label" 
      style={{
        color:"#f5f5f5",
    alignItems:"center"
    }}>
       Cancel 
      </span>
    </Button>
 
    </div>
</Box>
 </Modal>
      <div
      style={{
      width: '80%',
      height: '50%',
      marginLeft: '7%',
      marginTop: '2%',
        }}
      >
        { render ? <Calendar cellRender={cellRender} /> :  null }
      </div>
    </div>
  );
};

export default CalendarComponent;
import React,{ useEffect,useState } from "react";
import axios from 'axios'


export default  function Doctor(){
const [refresh,setRefreach]=useState(false)
// const handleRefresh=()=>{setRefresh(!refresh)
const [data,setData]=useState({})
// }


useEffect(()=>{

fetchdoctors ()
},[refresh])

const fetchdoctors = () => {
    axios.get("http://localhost:5000/api/doctors/allDoctors")
    .then(res=>{
        console.log("data",res.data) 
        setData(res.data[0])
    })
    .catch(err=>{
        console.log(err)
    })
}
}

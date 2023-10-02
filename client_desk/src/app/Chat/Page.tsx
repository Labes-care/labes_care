import React from 'react'
import { useState,useEffect } from 'react'
import {
    MultiChatWindow,
    MultiChatSocket,
    useMultiChatLogic,
  } from 'react-chat-engine-advanced';
  import ChatInterface from '../../../componets/dashboardComponent/ChatInterface';
  import dynamic from "next/dynamic";
import { useParams } from 'next/navigation';

  



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

const Chat = () => {
    // const [doctor, setDoctors] = useState<doctor>();
    // const searchParams = useParams()
    // useEffect(() => {
    //     const fetchDoctors = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3003//DoProfile/${searchParams.id}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch doctors');
    //             }
    //             const data = await response.json();
    //             setDoctors(data);
    //         } catch (error) {
    //             console.error('Error fetching doctors:', error);
    //         }
    //     };

    //     fetchDoctors()
    // }, [searchParams.id]);
    const chatProps = useMultiChatLogic(
        'cd2c7f92-c439-4b84-a96b-b862b60023a9',
        'ahmed',
        'ahmed'
      );

  return (
    <div>
    
    <ChatInterface projectId='cd2c7f92-c439-4b84-a96b-b862b60023a9' username='ahmed' secret='ahmed'/>
  </div>

  )
}
export default Chat;
'use client'
import React from 'react'
import './success.css'
import '../../../DoctorSignUp/signup.css'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  const searchParams = useParams()
console.log(searchParams);

  const handleContinue = async () => {
    // Fetch payment data using payment_id
    const url = window.location.href;
    try {
  
      // Extract doctor's ID from paymentData (replace with actual key)
      const index = url.lastIndexOf('/');
      const id = url.substring(index + 1, url.indexOf('?'));
  
      // Redirect to the doctor's profile page using the extracted ID
      router.push(`/DoProfile/${id}`);
    } catch (error) {
      console.error('An error occurred while fetching payment data:', error);
    }
  };
  return (

        
          <div className="centered">
    
        <div id="success-box">
    <div className="dot"></div>
    <div className="dot two"></div>
    <div className="face">
      <div className="eye"></div>
      <div className="eye right"></div>
      <div className="mouth happy"></div>
    </div>
    <div className="shadow scale"></div>
    <div className="message"><h1 className="alert">Success!</h1><p>yay, everything is working.</p></div>
    <button className="button-box" onClick={handleContinue}><h1 className="green">continue</h1></button>
  </div>
    </div>
  )
}

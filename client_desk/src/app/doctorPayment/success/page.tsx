'use client'
import React from 'react'
import './success.css'
import '../../DoctorSignUp/signup.css'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleContinue = () => {
    // Redirect to the doctor's profile page
    router.push(`/Login`); // Replace `doctorId` with the actual doctor's ID
  };
  return (

<div className="center-container">
      <div className="float-container">
        <div className="float-child float-child1">
          <div className="centered">
            <div className="frame">
              <figure>
                <div className="image-1"></div>
                {/* Loop for image-2 */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="image-2"></div>
                ))}
              </figure>
            </div>
          </div>
        </div>

        <div className="float-child float-child2">
          <div className="centered"></div>
    <div>
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
    </div>
        </div>
        </div>
  )
}

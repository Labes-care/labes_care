"use client"

import React from 'react'

function Settings() {
  return (
    <section>
        <div className="doctor-profile">
       

        <div className="user-info">
            <label className="name-input">Doctor's Name</label>
            <input type="text" id="name-input" placeholder="Enter name"/>
            
            <label className="bio-input">E-Mail</label>
            <textarea id="bio-input" placeholder="Enter E-Mail"></textarea>

            <label className="phone-number-input">Password</label>
            <textarea id="phone-number-input" placeholder="Enter Password"></textarea>

            <label className="phone-number-input">Phone Number</label>
            <textarea id="phone-number-input" placeholder="Enter Phone Number"></textarea>

            <label className="phone-number-input">Address</label>
            <textarea id="phone-number-input" placeholder="Enter Address"></textarea>
           
            <label className="phone-number-input">Cover Picture</label>
            <textarea id="phone-number-input" placeholder="Enter Cover Picture"></textarea>

            <label className="phone-number-input">Profile Picture</label>
            <textarea id="phone-number-input" placeholder="Enter Profile Picture"></textarea>
           
            <button className="update-button">Update Profile</button>
        </div>
    </div>
    </section>
  )
}

export default Settings



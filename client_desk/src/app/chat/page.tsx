"use client"

import React from "react"
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';



function chat() {
  return (
    <div className="chat-container">

    <div className="chat-header">

      <div className="patient-info">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW88uZyCC1rKT6cFCuQEhtoA9gwtpOH5ghYA&usqp=CAU" alt="Patient Avatar" className="patient-avatar"/>
        <h2>Josh Smith</h2>
      </div>

    </div>

    <div className="chat-messages">
     
    <div>
    <ChatMsg
      avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW88uZyCC1rKT6cFCuQEhtoA9gwtpOH5ghYA&usqp=CAU'}
      messages={[
        'Hi Jenny, How r u today?',
        'Did you train yesterday',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
      ]}
    />
    <ChatMsg
      side={'right'}
      messages={[
        "Great! What's about you?",
        'Of course I did. Speaking of which check this out',
      ]}
    />
    <ChatMsg avatar={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW88uZyCC1rKT6cFCuQEhtoA9gwtpOH5ghYA&usqp=CAU'} messages={['Im good.', 'See u later.']} />
  </div>

    </div>
    <div className="chat-input">
      <input type="text" id="message-input" placeholder="Type your response..."/>
      <button id="send-button">Send</button>
    </div>
  </div>
  )
}

export default chat

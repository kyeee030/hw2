import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import { createNewChat } from './database.js';
import titleimg from '/src/assets/title.png';
import '/src/style/chat.css'
import '/src/style/style.css';

function Chat({ onNavigate, imgOpacity }) {

    return (
        <div className="text-context">
            <img 
                src={titleimg} 
                alt="" 
                className="goodimg" 
                style={{ opacity: imgOpacity}}/>
            {/* <h3 className="title" color='white'> Chat</h3> */}
        </div>
    )
}

export default Chat;
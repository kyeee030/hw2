import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import { submitMessage, getChat } from './database.js';
import { chatRoomCode } from './Menu.jsx';
import titleimg from '/src/assets/title.png';
import '/src/style/chat.css'
import '/src/style/style.css';

function Chat({ onNavigate, imgOpacity }) {

    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState(null);

    useEffect(() => {
        async function fetchChat() {
            const data = await getChat(chatRoomCode);
            setChatData(data);
        }
        fetchChat();
    }, [])

    async function handleSubmit() {
        await submitMessage(message, user, chatRoomCode);
        setMessage('');
        const updatedChat = await getChat(chatRoomCode);
        setChatData(updatedChat);
    }

    return (
        <div className="text-context">
            {imgOpacity!=-1 && <img 
                src={titleimg} 
                alt="" 
                className="goodimg" 
                style={{ opacity: imgOpacity}}/>}
            {imgOpacity==-1 && <div className="chatScrollbar">
                {chatData?.messages?.map((m, index) => (
                        <div 
                            key={index} 
                            className="message" >
                            <label htmlFor="messageBox" className="userName">{m.userName}</label>
                            <div className="messageBox" id='messageBox'>
                                <p className="messageContent">{m.content}</p>
                            </div>
                        </div>
                    ))}
            </div>}
            {imgOpacity==-1 && <div className="row">
                <input type="text" className="typingBox" placeholder="Type somthing..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                <div className="submitBtn" onClick={handleSubmit}>
                    <p className="submit">Submit</p>
                </div>
            </div>}
        </div>
    )
}

export default Chat;
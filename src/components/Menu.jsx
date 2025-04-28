import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import { getUserChats } from './database.js';
import '/src/style/menu.css'
import '/src/style/style.css';

let chatRoomCode = '';
export {chatRoomCode};

function Menu({ onNavigate }) {

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const userChats = await getUserChats(user);
        setChats(userChats || []);
    }
    
    useEffect(() => {
        fetchChats();
    }, [chats])

    const handleLogOut = async () => {
        await logout(auth);
        onNavigate('signin');
    }

    function handleChatRoom (code) {
        chatRoomCode = code;
        onNavigate('chat');
    }

    return (
        <div className="text-context">
            <h3 className="title">Welcome, {user.displayName}</h3>
            <div className="scrollbar">
                {chats.map((chat, index) => (
                        <div 
                            key={index} 
                            className="chatbtn" 
                            onClick={() => handleChatRoom(chat.code)}>
                            <p className="btntext">{chat.name} {chat.code}</p>
                        </div>
                    ))}
            </div>
            <div className="row">
                <div className="menubtn" onClick={handleLogOut}>
                    <p className="btntext">Log Out</p>
                </div>
                <div></div> <div></div>
                <div className="menubtn" onClick={() => onNavigate('addchat')}>
                    <p className="btntext">New</p>
                </div>
            </div>
        </div>
    )
}

export default Menu;
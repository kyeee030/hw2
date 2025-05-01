import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import { getUserChats } from './database.js';
import '/src/style/menu.css'
import '/src/style/style.css';

let chatRoomCode = '';
export { chatRoomCode };

function Menu({ onNavigate, setUnsendMessages }) {

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const userChats = await getUserChats(user);
        setChats(userChats || []);
    }
    
    useEffect(() => {
        fetchChats();
    }, [chats])

    useEffect(() => {   
        if (Notification.permission === 'granted') {
            new Notification('Welcome to the chat app!', {
                body: 'You can now start chatting with your friends!',
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Welcome to the chat app!', {
                        body: 'You can now start chatting with your friends!',
                    });
                }
            });
        }
    }, []);

    const handleLogOut = async () => {
        await logout(auth);
        onNavigate('signin');
    }

    function handleChatRoom (code) {
        if (code !== chatRoomCode)
            setUnsendMessages('');
        chatRoomCode = code;
        onNavigate('chat');
    }

    return (
        <div className="text-context">
            <h3 className="cyberpunk glitched3">Welcome, {user.displayName}</h3>
            <div className="scrollbar cyberpunk glitched">
                {chats.map((chat, index) => (
                        <div 
                            key={index} 
                            className="chatbtn" 
                            onClick={() => handleChatRoom(chat.code)}>
                            <span>{chat.name}</span>
                            <span>{chat.code}</span>
                        </div>
                    ))}
            </div>
            <div className="row">
                <div className="menubtn" onClick={handleLogOut}>
                    <h2 className="btntext cyberpunk glitched">Log Out</h2>
                </div>
                <div className="menubtn" onClick={() => onNavigate('addchat')}>
                    <h2 className="btntext cyberpunk glitched2">New</h2>
                </div>
            </div>
        </div>
    )
}

export default Menu;
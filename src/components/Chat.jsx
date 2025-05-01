import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import { submitMessage, getChat, deleteMessage } from './database.js';
import { chatRoomCode } from './Menu.jsx';
import titleimg from '/src/assets/title.png';
import GifPicker from 'gif-picker-react';
import '/src/style/chat.css'
import '/src/style/style.css';

function Chat({ onNavigate, imgOpacity, setUnsendMessages, UnsendMessages }) {

    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [searchContent, setSearchContent] = useState('');

    useEffect(() => {
        async function fetchChat() {
            setMessage(UnsendMessages);
            const data = await getChat(chatRoomCode);
            setChatData(data);
        }
        fetchChat();
    }, [])

    async function handleSubmit() {
        if(message.trim() === '') return;
        await submitMessage(message, user, chatRoomCode);
        setMessage('');
        const updatedChat = await getChat(chatRoomCode);
        setChatData(updatedChat);
    }

    function handleLeave() {
        setUnsendMessages(message);
        setMessage('');
        onNavigate('menu');
    }

    async function handleRightClick(e, messageObj, index) {
        e.preventDefault();
        if (messageObj.userName !== user.displayName) return;
    
        const confirmed = window.confirm("Unsend this message?");
        if (!confirmed) return;
    
        await deleteMessage(chatRoomCode, index);
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
            {imgOpacity==-1 && <h1>{chatData.name}</h1>}
            <div className="row">
                {imgOpacity==-1 && <div className="picker twinkle3">
                    <GifPicker 
                        tenorApiKey={"AIzaSyCpDlJFAM5ISwZ2Qf5fPSsW213-gUnT42s"} 
                        onGifClick={(gif, e) => {
                            const url = gif?.media_formats?.gif?.url || gif?.url;
                            if (!url) {
                              console.error('No valid GIF URL found:', gif);
                              return;
                            }
                            setSelectedGif(url);
                            setMessage(url);
                          }}/>
                    </div>}
                {imgOpacity==-1 && <div className="chatScrollbar">
                    {chatData?.messages?.filter(m => m.content.toLowerCase().includes(searchContent.toLowerCase()))
                    .map((m, index) => (
                            <div 
                                key={index}
                                onContextMenu={(e) => handleRightClick(e, m, index)} 
                                className="message" style={m.userName==user.displayName ? 
                                {alignItems: 'flex-end'} : 
                                {alignItems: 'flex-start'}}>
                                <label htmlFor={`messageBox${index}`} className="userName">{m.userName}</label>
                                <div className="messageBox" id={`messageBox${index}`}>
                                    {m.content.endsWith('.gif') || m.content.includes('tenor.com') ? (
                                        <img src={m.content} alt="gif" className="gif-message"/>
                                    ) : (
                                        <p className="messageContent">{m.content}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>}
                {imgOpacity==-1 && <div className="searchbox">
                    <input type="text" className="search twinkle1" id="search" placeholder="Searching..." value={searchContent} onChange={(e) => setSearchContent(e.target.value)}/>
                </div>}
            </div>
            {imgOpacity==-1 && <div className="row">
                <input type="text" className="typingBox twinkle2" placeholder="Type somthing..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                <div className="submitBtn twinkle2" onClick={handleSubmit}>
                    <p className="submit">Submit</p>
                </div>
            </div>}
            {imgOpacity==-1 && <div onClick={handleLeave} className="leaveBtn">
                <p className="leave twinkle4">Leave</p>
            </div>}
        </div>
    )
}

export default Chat;
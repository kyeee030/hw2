import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import { createNewChat, addNewChat } from './database.js';
import '/src/style/menu.css'
import '/src/style/style.css';

function AddChat({ onNavigate }) {

    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const handleAddChat = async () => {
        if (code.length < 1) return;
        addNewChat(code, user)
        setName('');
        setCode('');
        onNavigate('menu');
    }

    const handleCreateChat = async () => {
        if (name.length < 1) return;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            code += letters[randomIndex];
        }
        createNewChat(name, code, user);
        setName('');
        setCode('');
        onNavigate('menu');
    }

    return (
        <div className="text-context">
            <h3 className="title">Welcome, {user.displayName}</h3>
            <div className="row">
                <input type="text" placeholder="Chat Code" value={code} onChange={(e) => setCode(e.target.value)}/>
                <div className="menubtn" onClick={handleAddChat}>
                    <p className="btntext">Add</p>
                </div>
            </div>
            <div className="row">
                <input type="text" placeholder="New Chat Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <div className="menubtn" onClick={handleCreateChat}>
                    <p className="btntext">Create</p>
                </div>
            </div>
            <div className="menubtn">
                <p className="btntext" onClick={() => onNavigate('menu')}>Back</p>
            </div>
        </div>
    )
}

export default AddChat;
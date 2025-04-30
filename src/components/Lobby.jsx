import { useEffect, useRef } from 'react';
import '/src/style/lobby.css'
import '/src/style/style.css';
//import '/src/style/cyberpunk.css'

function Lobby({ onNavigate }) {

    const signInRef = useRef(null);

    return (
    <div className="text-context">
        <h2 className="lobby-title glitched3">Welcome to my Chatroom</h2>
        <div className="row">
            <div className="menubtn" ref={signInRef} onClick={() => onNavigate('signin')}>
                <h2 className="cyberpunk btntext glitched">sign in</h2>
            </div>
            <div className="menubtn" ref={signInRef}>
                <h2 className="cyberpunk btntext glitched2">hello</h2>
            </div>
        </div>
    </div>)
}

export default Lobby;
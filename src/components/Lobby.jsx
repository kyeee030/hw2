import { useEffect, useRef } from 'react';
import '/src/style/lobby.css'
import '/src/style/style.css';

function Lobby({ onNavigate }) {

    const signInRef = useRef(null);

    return (
    <div className="text-context">
        <h2>Welcome to my Chatroom</h2>
        <div className="row">
            <div className="menubtn" ref={signInRef} onClick={() => onNavigate('signin')}>
                <p className="btntext">sign in</p>
            </div>
            {/* <div className="menubtn" ref={signUpRef}>
                <p className="btntext">sign up</p>
            </div> */}
        </div>
    </div>)
}

export default Lobby;
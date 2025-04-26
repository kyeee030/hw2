import { useEffect, useRef } from 'react';
import '/src/style/lobby.css'
import '/src/style/style.css';

function Lobby({ onNavigate }) {

    const signInRef = useRef(null);
    const signUpRef = useRef(null);

    useEffect(() => {
        const signInbtn = signInRef.current;
        const signUpbtn = signUpRef.current;

        signInbtn.addEventListener('click', () => onNavigate('signin'));
        //signUpbtn.addEventListener('click', () => onNavigate('signup'));
        
        return () => {
            signInbtn.removeEventListener('click', () => onNavigate('signin'));
           // signUpbtn.removeEventListener('click', () => onNavigate('signup'));
        };
    }, [onNavigate]);

    return (
    <div className="text-context">
        <h2>Welcome to my Chatroom</h2>
        <div className="row">
            <div className="signbtn" ref={signInRef}>
                <p className="btntext">sign in</p>
            </div>
            {/* <div className="signbtn" ref={signUpRef}>
                <p className="btntext">sign up</p>
            </div> */}
        </div>
    </div>)
}

export default Lobby;
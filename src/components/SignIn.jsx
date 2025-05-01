import { useEffect, useRef, useState } from 'react';
import { loginWithEmail, signInWithGoogle, registerWithEmail } from './auth.js';
import '/src/style/sign.css'
import '/src/style/style.css';

function SignIn({ onNavigate }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        let result = await loginWithEmail(email, password);
        if (result && result.user) 
            onNavigate('menu');
        else
            alert("Invalid email or password!");
        setEmail('');
        setPassword('');
    };

    const handleGoogleSignIn = async () => {
        let result = await signInWithGoogle();
        if (result && result.user) 
            onNavigate('menu');
    };

    const handleSignUp = async () => {
        let result = await registerWithEmail(email, password);
        if (result && result.user) 
            onNavigate('menu');
        else
            alert("Invalid email or password!");
        setEmail('');
        setPassword('');
    };

    return(
        <div className="text-context">
            <h3 className="cyberpunk glitched3">Sign In</h3>
            <div className="column">
                <label htmlFor="email" className="sign-label">Email</label>
                <input type="text" id="email" className="cyberpunk glitched" value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password" className="sign-label">Password</label>
                <input type="password" id="password" className="cyberpunk glitched" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="SignGoogle" onClick={handleGoogleSignIn}>
                    <h2 className="btntext cyberpunk glitched2">Sign In with Google</h2>
                </div>
                <div className="SignGoogle" onClick={handleSignUp}>
                    <h2 className="btntext cyberpunk glitched">Register</h2>
                </div>
                <div className="row">
                    <div className="signbtn" onClick={() => onNavigate('lobby')}>
                        <h2 className="btntext cyberpunk glitched2">Back</h2>
                    </div>
                    <div className="signbtn" onClick={handleSignIn}>
                        <h2 className="btntext cyberpunk glitched">Next</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
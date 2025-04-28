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
        };

    return(
        <div className="text-context">
            <h3>Sign In</h3>
            <div className="column">
                <label htmlFor="email" className="sign-label">Email</label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <label htmlFor="password" className="sign-label">Password</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="SignGoogle" onClick={handleGoogleSignIn}>
                    <p className="btntext">Sign In with Google</p>
                </div>
                <div className="SignGoogle" onClick={handleSignUp}>
                    <p className="btntext">Register</p>
                </div>
                <div className="row">
                    <div className="signbtn" onClick={() => onNavigate('lobby')}>
                        <p className="btntext">Back</p>
                    </div>
                    <div></div> <div></div>
                    <div className="signbtn" onClick={handleSignIn}>
                        <p className="btntext">Next</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
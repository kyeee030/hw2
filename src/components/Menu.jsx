import { useEffect, useRef, useState } from 'react';
import { logout, auth, user } from './auth.js';
import '/src/style/menu.css'
import '/src/style/style.css';

function Menu({ onNavigate }) {

    const handleLogOut = async () => {
        await logout(auth);
        onNavigate('signin');
    }

    return (
        <div className="text-context">
            <h2>Welcome, {user.displayName}</h2>
            <div className="scrollbar">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className="menubtn" onClick={handleLogOut}>
                <p className="btntext">Log Out</p>
            </div>
        </div>
    )
}

export default Menu;
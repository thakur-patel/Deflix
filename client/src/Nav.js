import React, { useEffect, useState } from 'react'
import "./Nav.css"

function Nav() {

    const [show, handleShow] = useState(false);
    return (
        <div className = {`nav ${ show && "nav__black" }`}>
            
            <a href="/">
            <img className = "nav__logo"
                src="https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png"
                alt="Deflix Logo"
            />
            </a>
            
        </div>
    )
}

export default Nav

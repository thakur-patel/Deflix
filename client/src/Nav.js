import React, { useEffect, useState } from 'react'
import "./Nav.css"

function Nav() {

    const [show, handleShow] = useState(false);


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        })
        return () =>{
            window.removeEventListener("scroll")    
        }
    }, [])
    return (
        <div className = {`nav ${ show && "nav__black" }`}>
            
            <a href="/">
            <img className = "nav__logo"
                src="https://fontmeme.com/permalink/210225/118decd2e18ca516ea15d77e75d1dcc3.png"
                alt="Deflix Logo"
            />
            </a>

            <img className = "nav__avtar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="Deflix Logo"
            />
            
        </div>
    )
}

export default Nav

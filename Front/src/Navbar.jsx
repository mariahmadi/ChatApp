import React from "react";
import { Link, NavLink } from "react-router-dom";
import './index.css'
const DisplayNav = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/Register">Sign Up</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/Login">Login</NavLink>

                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default DisplayNav
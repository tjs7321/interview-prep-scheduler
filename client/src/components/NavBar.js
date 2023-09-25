import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function NavBar({handleDarkModeToggle, darkMode}){

    return (
        <nav>
            <NavLink
            to="/" exact
            >
            Home
            </NavLink>
            <NavLink
            to="/calendar" exact
            >
            Calendar
            </NavLink>
            <NavLink
            to="/friends" exact
            >
            Friends
            </NavLink>
            <button
            onClick={handleDarkModeToggle}>{darkMode?"Dark":"Light"}
            </button>
        </nav>
        )
}

export default NavBar
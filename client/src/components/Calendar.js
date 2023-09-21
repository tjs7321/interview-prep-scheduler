import React from "react";
import { NavLink } from "react-router-dom";

function Calendar() {
    return(
        <div>
            <h1>Calendar Page</h1>
            <NavLink
            to="/newprepsession" exact
            >Button</NavLink>
        </div>
    )
}

export default Calendar
import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { NavLink } from "react-router-dom";

function Calendar() {
    return(
        <div>
            <h1>Calendar Page</h1>
            <NavLink
            to="/newprepsession" exact
            >Add New Event</NavLink>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            />
        </div>
    )
}

export default Calendar
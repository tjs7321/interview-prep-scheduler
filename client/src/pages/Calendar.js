import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { NavLink } from "react-router-dom";

function Calendar({userID}) {
    
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('/prep_sessions')
        .then(r=>r.json())
        .then((data) => {
            console.log(`initial calendar fetch: ${JSON.stringify(data)}`)  // DEBUG
            setEvents(data)
        })
    },[])

    

    return(
        <div>
            <h1>Calendar Page</h1>
            <NavLink
            to="/newprepsession" exact
            >Add New Event</NavLink>
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events = {events}
            />
        </div>
    )
}

export default Calendar
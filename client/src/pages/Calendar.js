import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { NavLink, useHistory } from "react-router-dom";

function Calendar({userID}) {
    
    const [events, setEvents] = useState([])

    const history = useHistory()

    useEffect(() => {
        fetch('/prep_sessions')
        .then(r=>r.json())
        .then((data) => {
            // console.log(`initial calendar fetch: ${JSON.stringify(data)}`)  // DEBUG
            setEvents(data)
        })
    },[])

    

    function handleEventClick(e) {
        history.push(`/sessions/${e.event.id}`)
    }

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
            eventClick={handleEventClick}
            />
        </div>
    )
}

export default Calendar
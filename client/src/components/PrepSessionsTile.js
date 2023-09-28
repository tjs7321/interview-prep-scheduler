import React from "react";
import { NavLink } from "react-router-dom";
import moment from 'moment-timezone'
function PrepSessionsTile({id, title, start}) {

    function handleClick(){
        console.log(`${id} was clicked!`)
    }

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YYYY h:mm')
    }

    return(
        <div>
            <NavLink
            to={`/sessions/${id}`}
            >{title}</NavLink>
            <p>{formatDate(start)}</p>
        </div>
        
    )
}

export default PrepSessionsTile
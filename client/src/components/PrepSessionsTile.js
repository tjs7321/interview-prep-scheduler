import React from "react";
import { NavLink } from "react-router-dom";
import moment from 'moment-timezone'

function PrepSessionsTile({id, title, start}) {

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YY @ h:mm')
    }

    return(
        <div class="four wide column"
        >
            <NavLink
            to={`/sessions/${id}`}
            >{title}</NavLink>
            <p>{formatDate(start)}</p>
        </div>
        
    )
}

export default PrepSessionsTile
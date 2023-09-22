import React from "react";
import { NavLink } from "react-router-dom";
import moment from 'moment-timezone'

function PrepSessionsTile({id, title, start}) {

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YY @ h:mm')
    }

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YYYY h:mm')
    }

    return(
        <div class="column">
            <div class="ui raised card">
                <div class="content">
                    <NavLink
                    class="center aligned header"
                    to={`/sessions/${id}`}
                    >{title}</NavLink>
                    <p class="center aligned description">{formatDate(start)}</p>
                </div>
            </div>
        </div>
        
    )
}

export default PrepSessionsTile
import React from "react";
import { NavLink } from "react-router-dom";

function PrepSessionsTile({id, title, start}) {

    return(
        <div class="four wide column">
            <NavLink
            to={`/sessions/${id}`}
            >{title}</NavLink>
            <p>{Date(start.slice(0, -1))}</p>
        </div>
        
    )
}

export default PrepSessionsTile
import React from "react";
import { NavLink } from "react-router-dom";

function PrepSessionsTile({id, title, start}) {

    function handleClick(){
        console.log(`${id} was clicked!`)
    }

    return(
        <div>
            <NavLink
            to={`/sessions/${id}`}
            >{title}</NavLink>
            <p>{Date(start.slice(0, -1))}</p>
        </div>
        
    )
}

export default PrepSessionsTile
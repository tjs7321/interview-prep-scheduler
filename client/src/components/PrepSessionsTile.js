import React from "react";

function PrepSessionsTile({title, start, end}) {
    return(
        <div>
            <h3>Session</h3>
            <p>Title: {title}</p>
            <p>Start Time: {start}</p>
            <p>End Time: {end}</p>
        </div>
        
    )
}

export default PrepSessionsTile
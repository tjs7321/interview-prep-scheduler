import React, {useState, useEffect} from "react";

export default function FollowToAddTile({id, username, email, session_id,onInvite}) {

    
    function handleAddToSession(){
        const body = JSON.stringify({
            user_id: id,
            session_id: session_id
        })
        fetch('/prep_session_users', {
            method: 'POST',
            headers: {"content-type": "application/json", "accepts":"application/json"},
            body: body
        }).then((r)=>{
            if (r.ok) {
                onInvite({
                    id: id,
                    username: username,
                    email: email
                })
            } else {
                console.log('nop')
            }
        })
    }

    return(
        <div class="four wide column">
            <p>{username}</p>
            <p>{email}</p>
            <button
            class="ui button"
            onClick={handleAddToSession}
            >Invite</button>
        </div>
    )
}

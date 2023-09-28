import React, {useState, useEffect} from "react";

function FriendCard({id, username, email}) {

    function handleFollowClick(){
        const body = JSON.stringify({
            id: id,
        })
        fetch('/followers_list', {
            method: 'POST',
            headers: {"content-type": "application/json", "accepts":"application/json"},
            body: body
        }).then((r)=>{
            if (r.ok) {
                console.log('following')
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
            onClick={handleFollowClick}
            >Follow</button>
        </div>
    )
}

export default FriendCard
import React, {useState, useEffect} from "react";

function FriendCard({id, username, email, handleAddFriend}) {

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
                r.json()
                .then(console.log(r))
                handleAddFriend()
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
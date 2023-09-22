import React, {useState, useEffect} from "react";

function FriendCard({id, username, email, handleRemoveFriend, friend}) {

    function handleRemoveClick(){
        const body = JSON.stringify({
            id: id,
        })
        fetch('/followers_list', {
            method: 'DELETE',
            headers: {"content-type": "application/json", "accepts":"application/json"},
            body: body
        }).then((r)=>{
            if (r.ok) {
                r.json()
                .then(console.log(r))
                handleRemoveFriend(friend)
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
            onClick={handleRemoveClick}
            >Unfollow</button>
        </div>
    )
}

export default FriendCard
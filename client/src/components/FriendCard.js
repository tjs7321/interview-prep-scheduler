import React, {useState, useEffect} from "react";

function FriendCard({id, username, email, handleRemoveFriend, friend, darkMode}) {

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
        <div class="column">
            <div class="ui raised card">
                <div class="content">
                    <div class="center aligned header">{username}</div>
                    <div class="center aligned description">{email}</div>
                </div>
                <div
                class={darkMode?"ui secondary button":"ui inverted secondary button"}
                onClick={handleRemoveClick}
                >Unfollow</div>
            </div>
        </div>
    )
}

export default FriendCard
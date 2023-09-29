import React, {useState, useEffect} from "react";

function UserCard({id, username, email, handleAddFriend, user, darkMode}) {

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
                handleAddFriend(user)
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
                class={darkMode?"ui inverted primary button":"ui primary button"}
                onClick={handleFollowClick}
                >Follow</div>
            </div>
        </div>
    )
}

export default UserCard
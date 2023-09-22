import React, {useState, useEffect} from "react";

function FriendCard({username, email}) {
    return(
        <div class="four wide column">
            <p>{username}</p>
            <p>{email}</p>
            <button class="ui button">Follow</button>
        </div>
    )
}

export default FriendCard
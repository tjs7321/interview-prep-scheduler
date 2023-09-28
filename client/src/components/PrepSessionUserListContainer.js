import { useEffect, useState } from "react"

import FollowToAddTile from "./FollowToAddTile"

export default function PrepSessionUserListContainer(props) {
    const {users, addingUsers, onClickAdd, session_id, onInvite} = props
    const [following, setFollowing] = useState([])

    useEffect(()=> {
        fetch('/following_list')
        .then(r=>r.json())
        .then(setFollowing)
    }, [])
    // RENDERED PIECES
    const renderedUserList = users.map(result => {
        return (
            <li key={result['id']}>{result['username']}</li>
        )
    })

    const attendingIDs = users.map(user=>user.id)
    const toInvite = following.filter(friend=>{
        
        return !attendingIDs.includes(friend.id)})

    const renderedFriendsList = toInvite.map(friend => {
        return (
                <FollowToAddTile
                {...friend}
                session_id={session_id}
                key={friend.id}
                users={users}
                onInvite={onInvite}
                />)}
    )
    


    if (!addingUsers) {
        return (
            <div>
                <button onClick={onClickAdd}>Add friends...</button>
                <ul>
                    {renderedUserList}
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={onClickAdd}>Done</button>
                <h4>Your follows: </h4>
                <div class="ui grid">
                    {renderedFriendsList}
                </div>
            </div>
        )
    }
}
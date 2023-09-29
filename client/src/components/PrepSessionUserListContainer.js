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
            <p key={result['id']}>{result['username']}</p>
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
            <div className='userListContainer'>
                <h3>Attending:</h3>
                <div className='sessionUserList'>
                    {renderedUserList}
                </div>
                <div className='editDeleteAddButtons'>
                    <button className='ui button' onClick={onClickAdd}>Add friends...</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className='userListContainer'>
                <div className='editDeleteAddButtons'>
                    <button className='ui button' onClick={onClickAdd}>Done</button>
                </div>
                <div>
                    <h2 className='usersToAdd'>Your follows: </h2>
                </div>
                <div class="ui grid">
                    {renderedFriendsList}
                </div>
            </div>
        )
    }
}
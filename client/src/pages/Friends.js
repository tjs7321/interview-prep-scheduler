import React, {useState, useEffect} from "react";
import FriendCard from "../components/FriendCard";
import FriendsSearchBar from "../components/FriendsSearchBar";

function Friends() {

    const [allUsers, setAllUsers] = useState([])
    const [allFriends, setAllFriends] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch('/users').then((r) => {
            if (r.ok) {
            r.json().then((user) => setAllUsers(user));
            }
        });
        }, []);

    useEffect(() => {
        fetch('/followers_list').then((r) => {
            if (r.ok) {
            r.json().then((user) => setAllFriends(user));
            }
        });
        }, []);
    
    console.log(allFriends)

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    let filteredUsers = allUsers
    if (search !== ''){filteredUsers =
    allUsers.filter((user) => 
    user.username.toLowerCase().includes(search.toLowerCase()))}

    return(
        <div>
            <h1 class="ui center aligned icon header">Follow Page</h1>
            <FriendsSearchBar
            handleSearchChange={handleSearchChange}
            />
            <div class="ui grid">
                {filteredUsers.map((friend) =>
                <FriendCard
                {...friend}
                key={friend.id}
                />)}
            </div>
        </div>
    )
}

export default Friends
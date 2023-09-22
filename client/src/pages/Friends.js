import React, {useState, useEffect} from "react";
import FriendCard from "../components/FriendCard";
import FriendsSearchBar from "../components/FriendsSearchBar";

function Friends() {

    const [friends, setFriends] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch('/followers_list').then((r) => {
            if (r.ok) {
            r.json().then((user) => setFriends(user));
            }
        });
        }, []);

    function handleSearchChange(e){
        setSearch(e.target.value)
        console.log(search)
    }

    let filteredFriends = friends
    if (search !== ''){filteredFriends =
    friends.filter((friend) => friend.username.toLowerCase().includes(search.toLowerCase()))}

    return(
        <div>
            <h1>Friends Page</h1>
            <FriendsSearchBar
            handleSearchChange={handleSearchChange}
            />
            <div class="ui grid">
                {filteredFriends.map((friend) =>
                <FriendCard
                {...friend}
                key={friend.id}
                />)}
            </div>
        </div>
    )
}

export default Friends
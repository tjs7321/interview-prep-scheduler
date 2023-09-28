import React from "react";

function FriendsSearchBar({handleSearchChange, searchValue}) {
    return (
    <div>
        <div className="ui large fluid icon input">
            <input
                onChange={(e) => handleSearchChange(e)}
                type="text"
                placeholder="Search by Username"
                value={searchValue}
            />
            <i className="circular search link icon"></i>
        </div>
    </div>
    );
}

export default FriendsSearchBar;
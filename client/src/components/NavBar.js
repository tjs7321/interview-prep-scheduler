import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function NavBar({handleDarkModeToggle, darkMode, id, handleLogout}){

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                handleLogout();
            }
        })}

    return (
        <div class={darkMode? 'ui inverted large menu':'ui large menu'}>
            <NavLink
            to="/" exact
            >
                <a
                class="item"
                >Home</a>
            </NavLink>
            <NavLink
            to="/calendar" exact
            >
                <a class="item"
                >Calendar</a>
            </NavLink>
            <NavLink
            to="/friends" exact
            >
                <a class="item"
                >Friends</a>
            </NavLink>
            <div class="right menu">
                {id===undefined?(
                    <NavLink
                    to="/login" exact
                    >
                        <a
                        class={darkMode?"ui primary button":"ui inverted primary button"}
                        >Sign In
                        </a>
                    </NavLink>
                ):(
                    <NavLink
                    to="/" exact
                    >
                        <a
                        class={darkMode?"ui primary button":"ui inverted primary button"}
                        onClick={handleLogoutClick}
                        >Logout
                        </a>
                    </NavLink>
                )}
                <a
                class={darkMode?"ui inverted secondary button":"ui secondary button"}
                onClick={handleDarkModeToggle}>{darkMode?"Light":"Dark"}
                </a>
            </div>
        </div>
        )
}

export default NavBar
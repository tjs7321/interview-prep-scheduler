import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function NavBar({handleDarkModeToggle, darkMode, handleSignIn, signedIn}){

    // const [activeItem, setActiveItem] = useState("")

    // function handleNavBarClick(e){
    //     setActiveItem(e.name)
    //     console.log(activeItem)
    // }

    return (
        <div class={darkMode? 'ui inverted large menu':'ui large menu'}>
            <NavLink
            to="/" exact
            >
                <a
                class="item"
                // name='home'
                // active={activeItem === 'home'}
                // onClick={handleNavBarClick}
                >Home</a>
            </NavLink>
            <NavLink
            to="/calendar" exact
            >
                <a class="item"
                // name='calendar'
                // active={activeItem === 'calendar'}
                // onClick={handleNavBarClick}
                >Calendar</a>
            </NavLink>
            <NavLink
            to="/friends" exact
            >
                <a class="item"
                // name='friends'
                // active={activeItem === 'friends'}
                // onClick={handleNavBarClick}
                >Friends</a>
            </NavLink>
            <div class="right menu">
                <NavLink
                to="/login" exact
                >
                    <a
                    class={darkMode?"ui primary button":"ui inverted primary button"}
                    onClick={handleSignIn}
                    >{signedIn ? "Logout" : "Sign In"}
                    </a>
                </NavLink>
                <a
                class={darkMode?"ui inverted secondary button":"ui secondary button"}
                onClick={handleDarkModeToggle}>{darkMode?"Light":"Dark"}
                </a>
            </div>
        </div>
        )
}

export default NavBar
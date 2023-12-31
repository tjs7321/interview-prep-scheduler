import React, { useState, useEffect } from "react";
import PrepSessionsTile from "../components/PrepSessionsTile";

function Home({username, darkMode}) {

    const [prepSessions, setPrepSessions] = useState([])

    useEffect(() => {
        fetch('/prep_sessions_home_screen').then((r) => {
            if (r.ok) {
            r.json().then((session) => setPrepSessions(session));
            }
        });
    }, []);

    return (
        <div>
            <div class={darkMode?"ui inverted raised segment":"ui raised segment"}>
                <h1 class="ui center aligned icon header"
                >{username ? `Welcome, ${username}!` : 'Please sign in to access all features'}</h1>
            </div>
            <div class={darkMode?"ui inverted raised segment":"ui raised segment"}>
                <h2 class="ui center aligned icon header"
                >Upcoming Events</h2>
                <div class="ui padded three column grid"
                >
                    {prepSessions.map((session) =>
                    <PrepSessionsTile
                    {...session}
                    key={session.id}
                    />)}
                </div>
            </div>
        </div>
    )
}

export default Home

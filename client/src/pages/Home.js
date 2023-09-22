import React, { useState, useEffect } from "react";
import PrepSessionsTile from "../components/PrepSessionsTile";

function Home({username}) {

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
            <div>
                <h1>{username ? `Welcome, ${username}!` : 'Please sign in to access all features'}</h1>
            </div>
            <div>
                <h2>Upcoming Events</h2>
                <div>
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

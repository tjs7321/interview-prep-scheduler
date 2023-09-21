import React, { useState, useEffect } from "react";

function Home({username}) {
    return (
        <div>
            <h1>{username ? `Welcome, ${username}!` : 'Please sign in to access all features'}</h1>
        </div>
    )
}

export default Home

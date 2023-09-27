import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SessionDetailPage() {

    const {id} = useParams()
    const [sessionInfo, setSessionInfo] = useState({
        'title': '',
        'description':'',
        'start':'',
        'end':'',
        'users': []
    })
    const [error, setError] = useState(false)


    useEffect(()=> {
        fetch(`/prep_sessions/${id}`)
        .then(r=>{
            if (r.ok) {
                console.log(`r = ${r}`)
                //console.log(`r.json() = ${r.json()}`)
                return r.json()
            } else {
                setError(true)
            }
        })
        .then(setSessionInfo)
    }, [])

    const renderedUserList = sessionInfo['users'].map(result => {
        return (
            <li key={result['id']}>{result['username']}</li>
        )
    })

    if (sessionInfo != {}) {
        console.log(`sessionInfo['users']: ${sessionInfo['users']}`)
        return (
            <div>
                <h1>Session Detail Page for session {id}!</h1>
                <ul>
                    <li>{sessionInfo['title']}</li>
                    <li>{sessionInfo['description']}</li>
                    <li>{sessionInfo['start']}</li>
                    <li>{sessionInfo['end']}</li>
                    {renderedUserList}
                </ul>
            </div>
        )
    } else if (error) {
        return (
            <div>
                <h1>Could not find session</h1>
                <button>Return to homepage?</button>
            </div>
        )
    }  else {
        return (
            <div>
                <h1>Session Detail Page for session {id}!</h1>
            </div>
        )
    }
}
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
    const [editing, setEditing] =useState(false)
    const [error, setError] = useState(false)
    const history = useHistory()

    useEffect(()=> {
        fetch(`/prep_sessions/${id}`)
        .then(r=>{
            if (r.ok) {
                console.log(`r = ${r}`)
                //console.log(`r.json() = ${r.json()}`)
                return r.json()
            } else {
                console.log('error!')
                setError(true)
                throw r
            }
        })
        .then(setSessionInfo)
    }, [])

    // EVENT HANDLERS
    function onClickDelete() {
        const result = window.confirm("Delete event?")
        if (result === true){
            fetch(`/prep_sessions/${id}`, {
                method: "DELETE",
            })
            .then(r=>r.json())
            .then(history.goBack())         // DOES THIS WORK?
        }
    }

    function onClickEdit() {
        setEditing(true)
    }

    // RENDERED PIECES
    const renderedUserList = sessionInfo['users'].map(result => {
        return (
            <li key={result['id']}>{result['username']}</li>
        )
    })
    
    
    // PAGE RENDER
    if (sessionInfo['title']) {
        console.log(`sessionInfo['users']: ${sessionInfo['users']}`)
        return (
            <div>
                <h1>Session Detail Page for session {id}!</h1>
                <button onClick={onClickDelete}>Click to Delete</button>
                <button onClick={onClickEdit}>Click to Edit</button>
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
                <button onClick={()=>history.goBack()}>Return to homepage?</button>
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
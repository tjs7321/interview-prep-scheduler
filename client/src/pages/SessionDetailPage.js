import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import PrepSessionDetailContainer from "../components/PrepSessionDetailContainer";
import PrepSessionUserListContainer from "../components/PrepSessionUserListContainer";

export default function SessionDetailPage() {

    const {id} = useParams()
    const [sessionInfo, setSessionInfo] = useState({
        'title': '',
        'description':'',
        'start':'',
        'end':''
    })
    const [sessionUsers, setSessionUsers] = useState([])
    const [editing, setEditing] =useState(false)
    const [error, setError] = useState(false)
    const history = useHistory()

    useEffect(()=> {
        fetch(`/prep_sessions/${id}`)
        .then(r=>{
            if (r.ok) {
                return r.json().then(data=> {
                    setSessionInfo({
                        'title':data['title'],
                        'description':data['description'],
                        'start':data['start'],
                        'end':data['end']
                    })
                    setSessionUsers(data['users'])
                })
            } else {
                console.log('error!')
                setError(true)
                
            }
        })
    }, [editing]) // Why isn't this re rendering every time....


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

    function handleSessionUpdate(data) {
        const body = JSON.stringify({
            title: data['title'],
            description: data['description'],
            start: data['start'].format(),
            end: data['end'].format()
        })
        fetch(`/prep_sessions/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json", "accepts":"application/json"},
            body: body
        }).then(r=>{
            if (r.ok) {
                return r.json().then(data => {
                    setSessionInfo(data)
                    setEditing(false)
                })
            } else {
                console.log('error!')
                setError(true)
                setEditing(false)
            }
        })
        // setEditing(false)
    }

    function handleAddUser() {

    }

    function onClickEdit() {
        setEditing(editing=>!editing)
    }
    
    
    
    // PAGE RENDER
    if (sessionInfo['title']) {
        //console.log(`sessionInfo['users']: ${sessionInfo['users']}`)
        return (
            <div>
                <h1>Session Detail Page for session {id}!</h1>
                <PrepSessionDetailContainer
                    sessionInfo={sessionInfo}
                    handleSessionUpdate={handleSessionUpdate}
                    editing={editing}
                    onClickDelete={onClickDelete}
                    onClickEdit={onClickEdit}
                />
                <PrepSessionUserListContainer
                    users={sessionUsers}
                    handleAddUser={handleAddUser}
                />
            </div>
        )
    } else if (error) {
        return (
            <div>
                <h1>Could not find session</h1>
                <button onClick={()=>history.push('/')}>Return to homepage?</button>
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
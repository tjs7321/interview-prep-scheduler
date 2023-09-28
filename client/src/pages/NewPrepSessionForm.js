import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import ErrorMessage from '../components/ErrorMessage'

function NewPrepSessionForm() {
    const prepSessionFormEmpty = {
        title: "",
        description: "",
        start: null,
        end: null}
    const [newPrepSession, setNewPrepSession] = useState(prepSessionFormEmpty)
    const [sessionDuration,setSessionDuration] = useState(1)  // HOURS
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()
    
    

    const timeConstraints = {
        minutes: {
            step: 15
        }
    }

    function handleAddPrepSession(newSession) {
        const body = JSON.stringify({
            title: newSession.title,
            description: newSession.description,
            start: newSession.start.format(),
            end: newSession.end.format()
        })
        // console.log(`body: ${body}`)
        fetch('/prep_sessions', {
            method: 'POST',
            headers: {"content-type": "application/json", "accepts":"application/json"},
            body: body
        }).then((r)=>{
            if (r.ok) {
                return 'success'       
            } else {
                console.log(r)
                return r.json()['message']
            }
        })
    }

    function handleFormSubmit(e){
        e.preventDefault()
        
        const outcome = handleAddPrepSession(newPrepSession)
        if (outcome === 'success') {
            history.push('/calendar')} // takes you back to calendar page?
        else {
            console.log(`outcome: ${outcome}`)
            history.push('/calendar')
        }
        
            // setNewPrepSession(prepSessionFormEmpty)
    }
    
    function handleTextChange(event) {
        
        setNewPrepSession({
          ...newPrepSession,
          [event.target.name]: event.target.value
        })
      }
    
    function handleStartChange(chosenStart) {
        try {
            setNewPrepSession({
                ...newPrepSession,
                start: chosenStart,
                end: chosenStart.clone().add(sessionDuration,'hours')
              })
        } catch {
        }
    }

    function handleEndChange(chosenEnd) {
        try {
            if (chosenEnd < newPrepSession.start){
                setErrorMessage('End time must be after start time')
            }else {
                setSessionDuration(chosenEnd.diff(newPrepSession.start,'hours',true))
                setNewPrepSession({
                    ...newPrepSession,
                    end: chosenEnd
                  })
            }
        } catch {
        }
    }

    function isValidEnd(end) {
        return end >= newPrepSession.start
    }

    return (
        <div>
            <h2>New Prep Session Form</h2>
            <ErrorMessage error={errorMessage}/>
            <div>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleTextChange}
                        value={newPrepSession.title}/>
                    </div>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleTextChange}
                        value={newPrepSession.description}/>
                    </div>
                    
                    <div>
                        <Datetime 
                            onChange={handleStartChange}
                            value={newPrepSession.start}
                            timeConstraints={timeConstraints}
                            inputProps={{placeholder:"Start Time"}}
                        />
                    </div>
                    <div>
                        <Datetime 
                            onChange={handleEndChange}
                            value={newPrepSession.end}
                            isValidDate={isValidEnd}
                            timeConstraints={timeConstraints}
                            inputProps={{placeholder:"End Time"}}
                        />
                    </div>
                    
                <button
                type="submit"
                >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewPrepSessionForm
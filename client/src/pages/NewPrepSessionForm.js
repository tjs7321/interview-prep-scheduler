import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

function NewPrepSessionForm() {
    const prepSessionFormEmpty = {
        title: "",
        description: "",
        start: null,
        end: null}
    const [newPrepSession, setNewPrepSession] = useState(prepSessionFormEmpty)
    const [outcome, setOutcome] = useState('')
    const [sessionDuration,setSessionDuration] = useState(1)  // HOURS
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
                setOutcome('success')
            } else {
                console.log(r)
                setOutcome(r.json()['message'])
            }
        })
    }

    function handleFormSubmit(e){
        e.preventDefault()
        // console.log(JSON.stringify(newPrepSession))
        handleAddPrepSession(newPrepSession)
        // console.log(`outcome: ${outcome}`)
        if (outcome === 'success') {
            history.push('/calendar')} // takes you back to calendar page?
        else {
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
    
    function handleStartChange(event) {
        try {
            setNewPrepSession({
                ...newPrepSession,
                start: event,
                end: event.clone().add(sessionDuration,'hours')
              })
            //   console.log(`Change to string: ${newPrepSession.start.toString()}`)
        } catch {
        }
    }

    function handleEndChange(event) {
        try {
            setSessionDuration(event.diff(newPrepSession.start,'hours',true))
            setNewPrepSession({
                ...newPrepSession,
                end: event
              })
            //   console.log(`Change to string: ${newPrepSession.end.toString()}`)
        } catch {
        }
    }


    return (
        <div>
            <h2>New Prep Session Form</h2>
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
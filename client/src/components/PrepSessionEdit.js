import React, {useState} from 'react'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import moment from 'moment-timezone'

import ErrorMessage from './ErrorMessage';

export default function PrepSessionEdit(props) {

    const {sessionInfo, onSubmit, onCancel} = props
    
    const [formData, setFormData] = useState({
        title: sessionInfo['title'],
        description: sessionInfo['description'],
        start: moment(sessionInfo['start']),
        end: moment(sessionInfo['end'])
    })
    const [sessionDuration,setSessionDuration] = useState(1)  // HOURS
    const [errorMessage, setErrorMessage] = useState('')
    

    const timeConstraints = {
        minutes: {
            step: 15
        }
    }

    function handleTextChange(event) {
        
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        })
      }
    
    function handleStartChange(event) {
        try {
            setFormData({
                ...formData,
                start: event,
                end: event.clone().add(sessionDuration,'hours')
              })
            //   console.log(`Change to string: ${FormData.start.toString()}`)
        } catch {
        }
    }

    function handleEndChange(chosenEnd) {
        try {
            if (chosenEnd < formData.start){
                setErrorMessage('End time must be after start time')
            } else {
                setErrorMessage('')
                setSessionDuration(chosenEnd.diff(formData.start,'hours',true))
                setFormData({
                    ...formData,
                    end: chosenEnd
                  })
            }
            //   console.log(`Change to string: ${FormData.end.toString()}`)
        } catch {
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(formData)
        
    }

    function isValidEnd(end) {
        return end >= formData.start
    }

    return (
        <div className='editForm'>
            <h2>Edit Prep Session</h2>
            <ErrorMessage error={errorMessage}/>
            <div>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div className='field'>
                        <label>Event Title</label>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleTextChange}
                        value={formData.title}/>
                    </div>
                    <div className='field'>
                        <label>Description</label>
                        <textarea
                        rows='4'
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleTextChange}
                        value={formData.description}/>
                    </div>
                    
                    <div>
                        <label>Start</label>
                        <Datetime 
                            onChange={handleStartChange}
                            value={formData.start}
                            timeConstraints={timeConstraints}
                            inputProps={{placeholder:"Start Time"}}
                        />
                    </div>
                    <div>
                        <label>End</label>
                        <Datetime 
                            onChange={handleEndChange}
                            value={formData.end}
                            isValidDate={isValidEnd}
                            timeConstraints={timeConstraints}
                            inputProps={{placeholder:"End Time"}}
                        />
                    </div>
                    <div className='submitCancelButtons'>
                        <button
                        className='ui button'
                        type="submit"
                        >Submit</button>
                        
                        <button
                        className='ui button'
                        onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
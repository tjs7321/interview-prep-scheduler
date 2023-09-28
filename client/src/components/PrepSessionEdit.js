import React, {useState} from 'react'
import Datetime from 'react-datetime'
import "react-datetime/css/react-datetime.css";
import moment from 'moment-timezone'

export default function PrepSessionEdit(props) {

    const {sessionInfo, onSubmit, onCancel} = props
    
    const [formData, setFormData] = useState({
        title: sessionInfo['title'],
        description: sessionInfo['description'],
        start: moment(sessionInfo['start']),
        end: moment(sessionInfo['end'])
    })
    const [sessionDuration,setSessionDuration] = useState(1)  // HOURS
    
    

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

    function handleEndChange(event) {
        try {
            setSessionDuration(event.diff(formData.start,'hours',true))
            setFormData({
                ...formData,
                end: event
              })
            //   console.log(`Change to string: ${FormData.end.toString()}`)
        } catch {
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(formData)
        
    }

    return (
        <div>
            <h2>Edit Prep Session</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleTextChange}
                        value={formData.title}/>
                    </div>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleTextChange}
                        value={formData.description}/>
                    </div>
                    
                    <div>
                        <Datetime 
                            onChange={handleStartChange}
                            value={formData.start}
                            timeConstraints={timeConstraints}
                            inputProps={{placeholder:"Start Time"}}
                        />
                    </div>
                    <div>
                        <Datetime 
                            onChange={handleEndChange}
                            value={formData.end}
                            timeConstraints={timeConstraints}
                            inputProps={{placeholder:"End Time"}}
                        />
                    </div>
                    
                <button
                type="submit"
                >Submit</button>
                </form>
            </div>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}
import React, {useState} from "react";

function NewPrepSessionForm() {
    const prepSessionFormEmpty = {
        title: "",
        description: "",
        effect: "",
        endTime: ""}
    const [newPrepSession, setNewPrepSession] = useState(prepSessionFormEmpty)
    
    function handleFormSubmit(e){
        e.preventDefault()
        // takes you back to calendar page?
        setNewPrepSession(prepSessionFormEmpty)
    }
    
    function handleTitleEdit(e){
        let {name, value} = e.target
        setNewPrepSession(newPrepSession =>
            ({...newPrepSession, title: {...newPrepSession.title, [name]:value}}))
    }
    function handleDescriptionEdit(e){
        let {name, value} = e.target
        setNewPrepSession(newPrepSession =>
            ({...newPrepSession, description: {...newPrepSession.description, [name]:value}}))
    }
    function handleStartTimeEdit(e){
        let {name, value} = e.target
        setNewPrepSession(newPrepSession =>
            ({...newPrepSession, startTime: {...newPrepSession.startTime, [name]:value}}))
    }
    function handleEndTimeEdit(e){
        let {name, value} = e.target
        setNewPrepSession(newPrepSession =>
            ({...newPrepSession, endTime: {...newPrepSession.endTime, [name]:value}}))
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
                        onChange={handleTitleEdit}
                        value={newPrepSession.title}/>
                    </div>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="description"
                        name="description"
                        onChange={handleDescriptionEdit}
                        value={newPrepSession.description}/>
                    </div>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="Start Time"
                        name="startTime"
                        onChange={handleStartTimeEdit}
                        value={newPrepSession.startTime}/>
                    </div>
                    <div>
                        <input
                        style={{margin:"3px"}}
                        required
                        type="text"
                        placeholder="End Time"
                        name="endTime"
                        onChange={handleEndTimeEdit}
                        value={newPrepSession.endTime}/>
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
import React, {useState} from 'react'
import PrepSessionEdit from './PrepSessionEdit'
import moment from 'moment-timezone'

export default function PrepSessionDetailContainer(props) {
    const {sessionInfo, handleSessionUpdate, editing, onClickDelete,onClickEdit} = props

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YYYY h:mm')
    }

    if (!editing) {
        return (
            <div>
                <h1 className='sessionTitle'>{sessionInfo['title']}</h1>
                <div className='editDeleteAddButtons'>
                    <button onClick={onClickDelete}>Click to Delete</button>
                    <button onClick={onClickEdit}>Click to Edit</button>
                </div>
                <div className='sessionDescription'>
                    <p>{sessionInfo['description']}</p>
                </div>
                
                
                <ul>
                    <li>{`Start: ${formatDate(sessionInfo['start'])}`}</li>
                    <li>{`End: ${formatDate(sessionInfo['end'])}`}</li>
                    
                </ul>
            </div>
        )
    } else {
        console.log('editing')
        return (
            <PrepSessionEdit 
                sessionInfo={{...sessionInfo}}
                onSubmit={handleSessionUpdate}
                onCancel={onClickEdit}
            />
        )
    }
}
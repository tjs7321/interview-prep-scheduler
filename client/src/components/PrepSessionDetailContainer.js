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
                    <button className='ui button' onClick={onClickDelete}>Click to Delete</button>
                    <button className='ui button' onClick={onClickEdit}>Click to Edit</button>
                </div>
                <div className='sessionDescription'>
                    <p>{sessionInfo['description']}</p>
                </div>
                
                
                <div className='startEndTime'>
                    <p>{`Start: ${formatDate(sessionInfo['start'])}`}</p>
                    <p>{`End: ${formatDate(sessionInfo['end'])}`}</p>
                    
                </div>
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
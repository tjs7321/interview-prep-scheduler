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
                <button onClick={onClickDelete}>Click to Delete</button>
                <button onClick={onClickEdit}>Click to Edit</button>
                <h3>{sessionInfo['title']}</h3>
                <ul>
                    <li>{sessionInfo['description']}</li>
                    <li>{formatDate(sessionInfo['start'])}</li>
                    <li>{formatDate(sessionInfo['end'])}</li>
                    
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
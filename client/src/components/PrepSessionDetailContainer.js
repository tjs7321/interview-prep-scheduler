import React, {useState} from 'react'
import PrepSessionEdit from './PrepSessionEdit'
import moment from 'moment-timezone'

export default function PrepSessionDetailContainer({sessionInfo, handleSessionUpdate, editing, onClickDelete,onClickEdit, darkMode}) {

    function formatDate(isodate) {
        return moment(isodate).format('MM-DD-YYYY h:mm')
    }

    if (!editing) {
        return (
            <div class={darkMode?"ui inverted raised segment":"ui raised segment"}>
                <h1 class="ui header"
                >{sessionInfo['title']}</h1>
                <div className='editDeleteAddButtons'>
                    <button
                    class={darkMode?"ui inverted red button":"ui red button"}
                    onClick={onClickDelete}
                    >Delete</button>
                    <button
                    class={darkMode?"ui inverted primary button":"ui primary button"}
                    onClick={onClickEdit}
                    >Edit</button>
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
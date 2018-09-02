import React from 'react';
import Member from '../Members';
import './Task.css';

const Task = ({name, date, member, onClick, active}) => {
    return (
        <div className={'task-container ' + active} onClick={onClick}>
            <div className='task-info'>
                <h3>{name}</h3>
                <p>Complete by: {date}</p>
            </div>
            <div className='task-member'>
                <Member name={member.name} color={member.color}/>
            </div>
        </div>
    )
}

export default Task;
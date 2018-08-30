import React from 'react';
import Member from '../Members';
import './TaskDetails.css';
import { Button } from 'react-bootstrap';

const TaskDetails = ({name, date, member, description}) => {
    return (
        <div className="task-details-container">
            <div className="task-details-info-container">
                <div className="task-details-info">
                    <h3>{name}</h3>
                    <p>Complete by: {date}</p>
                </div>
                <div className="task-details-member">
                    <Member name={member.name} color={member.color}/>
                    <p>Assigned to {member.name}</p>
                </div>
            </div>
            <p>{description}</p>
            <div className="task-details-buttons">
                <Button bsStyle="primary">Edit Task</Button>
                <Button>Complete Task</Button>
            </div>
        </div>
    )
}

export default TaskDetails;
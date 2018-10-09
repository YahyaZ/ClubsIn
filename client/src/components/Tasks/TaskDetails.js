import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Member from '../Members';
import './TaskDetails.css';

const completeTask = (_id, date, name, description, completed, assignee) => {
    fetch('/api/task', {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id,
            due_date: date,
            name,
            description,
            completed,
            assignee,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data));
};

const TaskDetails = ({
    taskId,
    name,
    date,
    members,
    description,
    completed,
}) => (
    <div className="task-details-container">
        <div className="task-details-info-container">
            <div className="task-details-info">
                <h3>{name}</h3>
                <p>{completed ? '' : `Complete by: ${new Date(date).toDateString()}`}</p>
                {new Date(date) < new Date() ? <p className="overdue">Overdue</p> : ''}
            </div>
            <div className="task-details-member">
                {members.map(member => (
                    <Member
                        firstName={member.firstName}
                        lastName={member.lastName}
                        key={member._id}
                    />
                ))}
                {members.length === 1 ? <p>Assigned to: {`${members[0].firstName} ${members[0].lastName}`}</p> : ''}
            </div>
        </div>
        <p>{description}</p>
        <div className="task-details-buttons">
            <Button bsStyle="primary">Edit Task</Button>
            <Button onClick={() => completeTask(taskId)}>Complete Task</Button>
        </div>
    </div>
);

export default TaskDetails;

TaskDetails.propTypes = {
    taskId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
};

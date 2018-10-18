import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Member from '../Members';
import './TaskDetails.css';

/* Detailed view of a task */
const TaskDetails = ({
    taskId,
    name,
    date,
    members,
    description,
    completed,
    getTasks,
    editLink,
}) => (
    <div className="task-details-container">
        <div className="task-details-info-container">
            <div className="task-details-info">
                <h3>{name}</h3>
                <p>{completed ? 'Completed' : `Complete by: ${new Date(date).toDateString()}`}</p>
                {new Date(date) < new Date() ? <p className="overdue">Overdue</p> : ''}
            </div>
            <div className="task-details-member">
                {members.map(member => (
                    <Member
                        _id={member._id}
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
            <Link to={editLink}>
                <Button bsStyle="primary">Edit Task</Button>
            </Link>
            {completed
                ? (
                    <Button
                        onClick={() => completeTask(taskId,
                            date, name, description, false, members, getTasks)}
                    >
                        Uncomplete Task
                    </Button>
                )
                : (
                    <Button
                        onClick={() => completeTask(taskId,
                            date, name, description, true, members, getTasks)}
                    >
                        Complete Task
                    </Button>
                )
            }
        </div>
    </div>
);

/* Changes the status of a task to complete/uncompleted based on current task state */
const completeTask = (_id, date, name, description, completed, assignee, getTasks) => {
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
    }).then((response) => {
        if (response.status === 200) {
            // update tasks to get up-to-date from database
            getTasks();
        }
    });
};

export default TaskDetails;

TaskDetails.propTypes = {
    taskId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    getTasks: PropTypes.func.isRequired,
    editLink: PropTypes.string.isRequired,
};

import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Member from '../Members';
import './TaskDetails.css';

const TaskDetails = ({
    name,
    date,
    member,
    description,
}) => (
    <div className="task-details-container">
        <div className="task-details-info-container">
            <div className="task-details-info">
                <h3>{name}</h3>
                <p>Complete by: {date}</p>
            </div>
            <div className="task-details-member">
                <Member name={member.name} color={member.color} />
                <p>Assigned to {member.name}</p>
            </div>
        </div>
        <p>{description}</p>
        <div className="task-details-buttons">
            <Button bsStyle="primary">Edit Task</Button>
            <Button>Complete Task</Button>
        </div>
    </div>
);

export default TaskDetails;

TaskDetails.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    member: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

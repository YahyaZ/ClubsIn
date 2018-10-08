import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Member from '../Members';
import './TaskDetails.css';

const TaskDetails = ({
    name,
    date,
    members,
    description,
}) => (
    <div className="task-details-container">
        <div className="task-details-info-container">
            <div className="task-details-info">
                <h3>{name}</h3>
                <p>Complete by: {new Date(date).toDateString()}</p>
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
            <Button>Complete Task</Button>
        </div>
    </div>
);

export default TaskDetails;

TaskDetails.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    description: PropTypes.string.isRequired,
};

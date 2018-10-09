import React from 'react';
import PropTypes from 'prop-types';
import Member from '../Members';
import './Task.css';
import Skeleton from 'react-loading-skeleton';

const Task = ({
    name,
    date,
    active,
    members,
    completed,
    onClick,
    onKeyPress,
}) => (
    <div
        role="button"
        tabIndex="0"
        className={`task-container ${active} ${completed ? 'completed' : ''} ${new Date(date) < new Date() && !completed ? 'overdue' : ''}`}
        onClick={onClick}
        onKeyPress={onKeyPress}
    >
        <div className="task-info">
            <h3>{name || <Skeleton />}</h3>
            <p>{name ? (completed ? 'Completed' : `Complete by: ${new Date(date).toDateString()}`) : <Skeleton />}</p>
        </div>
        <div className="task-member">
            {name && members.map(member => (
                <Member firstName={member.firstName} lastName={member.lastName} key={member._id} />
            ))}
        </div>
    </div>
);

export default Task;

Task.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
};

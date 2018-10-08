import React from 'react';
import PropTypes from 'prop-types';
import Member from '../Members';
import './Task.css';

const Task = ({
    name,
    date,
    active,
    members,
    onClick,
    onKeyPress,
}) => (
    <div
        role="button"
        tabIndex="0"
        className={`task-container ${active}`}
        onClick={onClick}
        onKeyPress={onKeyPress}
    >
        <div className="task-info">
            <h3>{name}</h3>
            <p>Complete by: {new Date(date).toDateString()}</p>
        </div>
        <div className="task-member">
            {members.map(member => (
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
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
};

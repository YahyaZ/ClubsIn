import React from 'react';
import PropTypes from 'prop-types';
import Member from '../Members';
import './Task.css';

const Task = ({
    name,
    date,
    active,
    member,
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
            <p>Complete by: {date}</p>
        </div>
        <div className="task-member">
            <Member name={member.name} color={member.color} />
        </div>
    </div>
);

export default Task;

Task.propTypes = {
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    member: PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
};

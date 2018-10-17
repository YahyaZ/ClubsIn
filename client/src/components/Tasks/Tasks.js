import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Member from '../Members';
import './Task.css';

const Task = ({
    name,
    date,
    active,
    members,
    completed,
    onClick,
    onKeyPress,
}) => {
    let completedRender = <Skeleton />;
    if (name) {
        completedRender = completed ? 'Completed' : `Complete by: ${new Date(date).toDateString()}`;
    }
    return (
        <div
            role="button"
            tabIndex="0"
            className={`task-container ${active} ${completed ? 'completed' : ''} ${new Date(date) < new Date() && !completed ? 'overdue' : ''}`}
            onClick={onClick}
            onKeyPress={onKeyPress}
        >
            <div className="task-info">
                <h3>{name || <Skeleton />}</h3>
                <p>{completedRender}</p>
            </div>
            <div className="task-member">
                {members.length < 3 ? members.map(member => (
                    <Member
                        _id={member._id}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        key={member._id}
                    />
                )) : ([
                    <Member
                        _id={members[0]._id}
                        firstName={members[0].firstName}
                        lastName={members[0].lastName}
                        key={members[0]._id}
                    />,
                    <Member
                        _id={members[1]._id}
                        firstName={members[1].firstName}
                        lastName={members[1].lastName}
                        key={members[1]._id}
                    />,
                    <Member
                        overflow
                        length={members.length - 2}
                        key="0"
                    />,
                ])}
            </div>
        </div>
    );
};

export default Task;

Task.defaultProps = {
    name: '',
    date: '',
    members: [],
    completed: false,
    onClick: () => {},
    onKeyPress: () => {},
};

Task.propTypes = {
    name: PropTypes.string,
    date: PropTypes.string,
    active: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})),
    completed: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
};

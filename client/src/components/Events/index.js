import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import Member from '../Members';
import './Event.css';

const Event = ({
    date,
    name,
    members,
    link,
    clubName,
}) => (
    link ? (
        <Link to={link}>
            <EventDetails
                date={date}
                name={name}
                members={members}
                clubName={clubName}
            />
        </Link>
    ) : (
        <EventDetails
            date={date}
            name={name}
            members={members}
            clubName={clubName}
        />
    )
);

export default Event;

Event.defaultProps = {
    date: '',
    name: '',
    members: [],
    link: '',
    clubName: '',
};

Event.propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({})),
    link: PropTypes.string,
    clubName: PropTypes.string,
};

const EventDetails = ({
    date,
    name,
    members,
    clubName,
}) => (
    <div className="event-container">
        <div className="event-date">
            {(date ? <h3>{new Date(date).toDateString()}</h3>
                : (
                    <p>
                        <Skeleton width={150} />
                    </p>
                )
            )}
        </div>
        <div className="event-details">
            <h4>{name || <Skeleton width={100} />}</h4>
            <h3>{clubName}</h3>
            <div className="member-list">
                {members.map(member => (
                    <Member
                        _id={member._id}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        key={member._id}
                    />
                ))}
            </div>
        </div>
    </div>
);

EventDetails.propTypes = {
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    clubName: PropTypes.string.isRequired,
};

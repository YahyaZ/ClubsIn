import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Member from '../Members';
import './Event.css';

const Event = ({
    date,
    name,
    members,
    link,
}) => (
    <Link to={link}>
        <div className="event-container">
            <div className="event-date">
                <h3>{new Date(date).toDateString()}</h3>
            </div>
            <div className="event-details">
                <h4>{name}</h4>
                <div className="member-list">
                    {members.map(member => (
                        <Member name={member.firstName} key={member._id} />
                    ))}
                </div>
            </div>
        </div>
    </Link>
);

export default Event;

Event.propTypes = {
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    link: PropTypes.string.isRequired,
};

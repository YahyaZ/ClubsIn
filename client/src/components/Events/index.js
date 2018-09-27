import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Member from '../Members';
import './Event.css';

const Event = ({
    date,
    name,
    link,
    members,
}) => (
    <Link to={{ pathname: link }}>
        <div className="event-container">
            <div className="event-date">
                <h3>{date}</h3>
            </div>
            <div className="event-details">
                <h4>{name}</h4>
                <div className="member-list">
                    {members.map(member => (
                        <Member name={member.name} color={member.color} key={member.name} />
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
    link: PropTypes.string.isRequired,
    members: PropTypes.string.isRequired,
};

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Member from '../Members';
import Skeleton from 'react-loading-skeleton';
import './Event.css';

const Event = ({
    date,
    name,
    members,
    link,
    clubName,
}) => (
        <Link to={link || '/'}>
            <div className="event-container">
                <div className="event-date">
                    {(date ? <h3>{new Date(date).toDateString()}</h3> :
                        <p>
                            <Skeleton width={150} />
                        </p>
                    )}
                </div>
                <div className="event-details">
                    <h4>{name || <Skeleton width={100}/>}</h4>
                    <h3>{clubName}</h3>
                    <div className="member-list">
                        {members ? (members.map(member => (
                            <Member
                                firstName={member.firstName}
                                lastName={member.lastName}
                                key={member._id}
                            />
                        ))):''}
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

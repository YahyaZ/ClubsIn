import React from 'react';
import Member from '../Members';
import { Link } from 'react-router-dom';
import './Event.css';

const Event = ({date, name, link, members}) => {
    return (
        <Link to={{pathname: link}}>
            <div className="event-container">
                <div className="event-date">
                    <h3>{date}</h3>
                </div>
                <div className="event-details">
                    <h4>{name}</h4>
                    <div className="member-list">
                        {members.map((member, i) =>
                            <Member name={member.name} color={member.color} key={i}/>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Event;
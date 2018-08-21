import React from 'react';
import Member from '../Members/Member';
import './Event.css';

const Event = (props) => {
    return (
        <div className="event-container">
            <div className="event-date">
                <h3>{props.date}</h3>
            </div>
            <div className="event-details">
                <h4>{props.name}</h4>
                <div className="member-list">
                    {props.members.map((member, i) =>
                        <Member name={member.name} color={member.color} key={i}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Event;
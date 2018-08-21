import React from 'react';
import './Member.css';

const Member = (props) => {
    return (
        <div className="member-circle" style={{backgroundColor: props.color}}>
            <p className="member-name">{props.name.substring(0, 1)}</p>
        </div>
    )
}

export default Member;
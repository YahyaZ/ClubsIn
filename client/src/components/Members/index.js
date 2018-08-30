import React from 'react';
import './Member.css';

const Member = ({name, color}) => {
    return (
        <div className="member-circle" style={{backgroundColor: color}}>
            <p className="member-name">{name.substring(0, 1)}</p>
        </div>
    )
}

export default Member;
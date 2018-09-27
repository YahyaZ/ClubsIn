import React from 'react';
import PropTypes from 'prop-types';
import './Member.css';

const Member = ({ name, color }) => (
    <div className="member-circle" style={{ backgroundColor: color }}>
        <p className="member-name">{name.substring(0, 1)}</p>
    </div>
);

export default Member;

Member.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

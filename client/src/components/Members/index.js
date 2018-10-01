import React from 'react';
import PropTypes from 'prop-types';
import './Member.css';

const Member = ({ name }) => (
    <div className="member-circle" style={{ backgroundColor: '#00f' }}>
        <p className="member-name">{name.substring(0, 1)}</p>
    </div>
);

export default Member;

Member.propTypes = {
    name: PropTypes.string.isRequired,
};

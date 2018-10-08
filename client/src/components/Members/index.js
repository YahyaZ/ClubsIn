import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import './Member.css';

const Member = ({ firstName, lastName }) => (
    <Tooltip title={`${firstName} ${lastName}`} placement="top">
        <Avatar>{firstName.substring(0, 1)}</Avatar>
    </Tooltip>
);

export default Member;

Member.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

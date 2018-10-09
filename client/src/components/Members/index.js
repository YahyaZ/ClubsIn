import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import './Member.css';
import CustomTooltip from '../Tooltip';

const Member = ({ firstName, lastName }) => (
    <CustomTooltip title={`${firstName} ${lastName}`} placement="top">
        <Avatar>{firstName.substring(0, 1)}</Avatar>
    </CustomTooltip>
);

export default Member;

Member.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

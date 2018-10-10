import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CustomTooltip from '../Tooltip';

const style = { margin: '5px' };

const Member = ({
    firstName,
    lastName,
    overflow,
    length,
}) => (
    overflow ? (
        <CustomTooltip title={`${length} other members...`} placement="top">
            <Avatar style={style}>{`+${length}`}</Avatar>
        </CustomTooltip>
    ) : (
        <CustomTooltip title={`${firstName} ${lastName}`} placement="top">
            <Avatar style={style}>{firstName.substring(0, 1)}</Avatar>
        </CustomTooltip>
    )
);

export default Member;

Member.defaultProps = {
    firstName: '',
    lastName: '',
    overflow: false,
    length: 0,
};

Member.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    overflow: PropTypes.bool,
    length: PropTypes.number,
};

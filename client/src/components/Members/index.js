import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import randomColor from 'randomcolor';
import CustomTooltip from '../Tooltip';

const Member = ({
    _id,
    firstName,
    lastName,
    overflow,
    length,
}) => (
    overflow ? (
        <CustomTooltip title={`${length} other members...`} placement="top">
            <Avatar style={{ margin: '5px', backgroundColor: randomColor({ luminosity: 'dark' }) }}>{`+${length}`}</Avatar>
        </CustomTooltip>
    ) : (
        <CustomTooltip title={`${firstName} ${lastName}`} placement="top">
            <Avatar style={{ margin: '5px', backgroundColor: randomColor({ seed: _id }) }}>{firstName.substring(0, 1)}</Avatar>
        </CustomTooltip>
    )
);

export default Member;

Member.defaultProps = {
    _id: '',
    firstName: '',
    lastName: '',
    overflow: false,
    length: 0,
};

Member.propTypes = {
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    overflow: PropTypes.bool,
    length: PropTypes.number,
};

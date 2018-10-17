import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import randomColor from 'randomcolor';
import CustomTooltip from '../Tooltip';

/**
 * Member avatar icon and tooltip popup that sets a random color based on ID.
 * Also has an overflow prop that will show the number of members
 * if the number of members on a single component overflows on the container
 */
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

import React from 'react';
import PropTypes from 'prop-types';

const SelectMemberOption = ({ memberId, firstName, lastName }) => (
    <option value={memberId}>{`${firstName} ${lastName}`}</option>
);

export default SelectMemberOption;

SelectMemberOption.propTypes = {
    memberId: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

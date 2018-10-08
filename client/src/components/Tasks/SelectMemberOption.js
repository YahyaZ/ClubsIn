import React from 'react';
import PropTypes from 'prop-types';

const SelectMemberOption = ({ index, firstName, lastName }) => (
    <option value={index}>{`${firstName} ${lastName}`}</option>
);

export default SelectMemberOption;

SelectMemberOption.propTypes = {
    index: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
};

import React from 'react';

const SelectMemberOption = ({ memberId, firstName, lastName }) => (
    <option value={memberId}>{`${firstName} ${lastName}`}</option>
)

export default SelectMemberOption;
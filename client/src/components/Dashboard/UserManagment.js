import React from 'react';
import PropTypes from 'prop-types';

const UserManagement = ({ user }) => (
    <div>
        Hello {user.firstName}
    </div>
);

export default UserManagement;

UserManagement.propTypes = {
    user: PropTypes.shape({}).isRequired,
};

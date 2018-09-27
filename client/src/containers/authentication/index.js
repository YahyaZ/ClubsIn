import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';

class Authentication extends Component {
    render() {
        const { type } = this.props;
        return (
            <div className="form-container">
                {type === 'Sign Up' ? <SignUp /> : <Login />}
            </div>
        );
    }
}

export default Authentication;

Authentication.propTypes = {
    type: PropTypes.string.isRequired,
};

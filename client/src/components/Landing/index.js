import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard';
import Welcome from '../Welcome';
import './landing.css';

const Landing = ({ isAuthenticated }) => (
    <div className="landing-container">
        {isAuthenticated ? <Dashboard /> : <Welcome />}
    </div>
);

export default Landing;

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

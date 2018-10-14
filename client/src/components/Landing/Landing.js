import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard';
import Welcome from '../Welcome';
import collabBackground from '../../resources/Background/collaboration-illustration.jpg';
import './landing.css';

const welcomeContainer = {
    backgroundImage: `url(${collabBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
};

const Landing = ({ isAuthenticated }) => (
    <div style={!isAuthenticated ? welcomeContainer : {}}>
        <div className={!isAuthenticated ? 'opaqueBox' : ''}>
            <div className="landing-container">
                {isAuthenticated ? <Dashboard /> : <Welcome />}
            </div>
        </div>
    </div>
);

export default Landing;

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

import React from 'react';
import Dashboard from '../Dashboard';
import Welcome from '../Welcome';
import './landing.css'

const Landing = (props) => (
    <div className="landing-container">
        {props.isAuthenticated?<Dashboard /> : <Welcome />}
    </div>
);

export default Landing;

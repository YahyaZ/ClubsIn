import React from 'react';
import Dashboard from '../Dashboard';
import Welcome from '../Welcome';

const Landing = (props) => (
    <div>
        {props.isAuthenticated?<Dashboard /> : <Welcome />}
    </div>
);

export default Landing;

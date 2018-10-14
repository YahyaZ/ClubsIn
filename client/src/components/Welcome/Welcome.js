import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './welcome.css';

const Welcome = () => (
    <div className="whiteText jumbotron jumbotron-fluid" style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
        <h1>Club&apos;in</h1>
        <p>
            Makes your university club management easy and efficient, so you can spend more time having fun! {/*eslint-disable-line*/}
        </p>

        <Link to="/login" style={{ marginRight: '10px' }}>
            <Button>Login</Button>
        </Link>
        <Link to="/signup">
            <Button>Sign Up</Button>
        </Link>
    </div>
);

export default Welcome;

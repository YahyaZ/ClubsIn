import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const LandingButtons = () => {
    return (
        <div className='navbar-buttons'>
            <Link to='/login'><Button bsStyle="primary">Log In</Button></Link>
            <Link to='/signup'><Button bsStyle="primary">Sign Up</Button></Link>
        </div>
    )
}

export default LandingButtons;
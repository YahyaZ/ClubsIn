import React, { Fragment } from 'react';
import { Button, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

/* Buttons for the initial unlogged in welcome page */
const LandingButtons = () => (
    <Fragment>
        <NavItem componentClass={Link} href="/login" to="/login"><Button bsStyle="primary">Log In</Button></NavItem>
        <NavItem componentClass={Link} href="/signup" to="/signup"><Button bsStyle="primary">Sign Up</Button></NavItem>
    </Fragment>
);

export default LandingButtons;

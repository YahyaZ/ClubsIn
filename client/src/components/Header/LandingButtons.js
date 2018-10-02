import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import './Header.css';
import MenuLink from './MenuLink';

const LandingButtons = () => (
    <Fragment>
        <MenuLink to="/login"><Button bsStyle="primary">Log In</Button></MenuLink>
        <MenuLink to="/signup"><Button bsStyle="primary">Sign Up</Button></MenuLink>
    </Fragment>
);

export default LandingButtons;

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import LOGO from '../../resources/LOGO/logo.png';
import './Header.css';
import LandingButtons from './LandingButtons';
import ClubButtons from './ClubButtons';
import EventButtons from './EventButtons';

const Header = () => (
    <Navbar fixedTop>
        <Navbar.Header>
            <Link to="/">
                <img className="logo" src={LOGO} alt="logo" />
            </Link>
        </Navbar.Header>
        <Nav>
            <Route exact path="/" component={LandingButtons} />
            <Route path="/club" component={ClubButtons} />
            <Route path="/event" component={EventButtons} />
        </Nav>
    </Navbar>
);

export default Header;

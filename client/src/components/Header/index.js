import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import LOGO from '../../resources/LOGO/logo.png';
import './Header.css';
import LandingButtons from './LandingButtons';
import ClubButtons from './ClubButtons';
import EventButtons from './EventButtons';
import LogOutButton from './LogOutButton';
import PropsRoute from '../../components/Routes/PropsRoute';

const Header = (props) => (
    <Navbar fixedTop>
        <Navbar.Header>
            <Link to="/">
                <img className="logo" src={LOGO} alt="logo" />
            </Link>
        </Navbar.Header>
        <Nav>
            {!props.props.isAuthenticated && <Route exact path = "/" component={LandingButtons} /> }
            {props.props.isAuthenticated && <PropsRoute path = "/" component={LogOutButton} props={props}/>}
            <Route path="/club" component={ClubButtons} />
            <Route path="/event" component={EventButtons} />
        </Nav>
    </Navbar>
);

export default Header;

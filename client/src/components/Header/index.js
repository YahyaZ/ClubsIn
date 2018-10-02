import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import LOGO from '../../resources/LOGO/logo.png';
import './Header.css';
import LandingButtons from './LandingButtons';
import ClubButtons from './ClubButtons';
import EventButtons from './EventButtons';
import LogOutButton from './LogOutButton';
import PropsRoute from '../Routes/PropsRoute';

const Header = props => (
    <Navbar fixedTop>
        <Navbar.Header>
            <Link to="/">
                <img className="logo" src={LOGO} alt="logo" />
            </Link>
        </Navbar.Header>
        <Nav>
            <Route exact path="/club/:clubId" component={ClubButtons} />
            <Route exact path="/club/:clubId/event/:eventId" component={EventButtons} />
            { // ignore lint as this is messed up lol
                props.props.isAuthenticated // eslint-disable-line
                    ? <PropsRoute path="/" component={LogOutButton} props={props} />
                    : <Route exact path="/" component={LandingButtons} />
            }
        </Nav>
    </Navbar>
);

export default Header;

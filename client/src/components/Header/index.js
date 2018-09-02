import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LOGO from '../../resources/LOGO/logo.png';
import './Header.css';

const Header = () => {
    return (
        <Navbar fixedTop>
            <Navbar.Header>
                <a href='#home'>
                    <img className='logo' src={LOGO} alt='logo'/>
                </a>
            </Navbar.Header>
            <Nav>

            </Nav>
        </Navbar>
    );
}

export default Header;
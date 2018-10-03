import React from 'react';
import { Button, NavItem } from 'react-bootstrap';

const LogOutButton = (props) => {
    const logout = () => {
        fetch('/api/user/logout', {
            mode: 'cors',
        }).then((response) => {
            if (response.status === 204) {
                props.props.authenticate(false); // eslint-disable-line
                localStorage.removeItem('User');
            }
        });
    };

    return (
        <NavItem>
            <Button bsStyle="danger" onClick={logout}>Log Out</Button>
        </NavItem>
    );
};

export default LogOutButton;

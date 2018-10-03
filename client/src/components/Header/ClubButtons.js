import React, { Component, Fragment } from 'react';
import { Button, NavItem } from 'react-bootstrap';
import './Header.css';
import InviteClub from '../InviteClub';
import MenuLink from './MenuLink';

class ClubButtons extends Component {
    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const { show } = this.state;
        // ignore lint as match is built in prop
        const { match } = this.props; // eslint-disable-line
        return (
            <Fragment>
                <MenuLink to={{ pathname: `/club/${match.params.clubId}/event` }}>
                    <Button bsStyle="primary">Add Event</Button>
                </MenuLink>
                <NavItem>
                    <Button bsStyle="success" onClick={this.handleShow}>Invite Execs</Button>
                    <InviteClub show={show} hide={this.handleClose} />
                </NavItem>
            </Fragment>
        );
    }
}

export default ClubButtons;

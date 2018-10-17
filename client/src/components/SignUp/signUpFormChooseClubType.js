import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Redirect from 'react-router-dom/Redirect';
import PropTypes from 'prop-types';
import ExistingClub from '../ExistingClub';

/* Button container to show existing club modal form or register new club page */
class SignUpFormChooseClubType extends Component {
    constructor() {
        super();
        this.state = {
            redirect: '',
            show: false,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOnClick = (page) => {
        this.setState({ redirect: page });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const { redirect, show } = this.state;
        const { rerender } = this.props;
        if (redirect) {
            if (redirect === 'existingClubRedirect') {
                return <Redirect push to="/existingClubRedirect" />;
            }
            if (redirect === 'newClubRedirect') {
                return <Redirect push to="/newClub" />;
            }
        }
        return (
            <React.Fragment>
                <ButtonToolbar bsSize="large">
                    <Button bsStyle="primary" type="button" onClick={this.handleShow}>Existing Club</Button>
                    <Button bsStyle="primary" type="button" onClick={() => this.handleOnClick('newClubRedirect')}>Register Club</Button>
                </ButtonToolbar>
                <ExistingClub show={show} hide={this.handleClose} rerender={rerender} />
            </React.Fragment>
        );
    }
}

export default SignUpFormChooseClubType;

SignUpFormChooseClubType.propTypes = {
    rerender: PropTypes.func.isRequired,
};

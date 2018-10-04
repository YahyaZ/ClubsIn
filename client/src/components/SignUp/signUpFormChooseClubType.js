import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Button, ButtonToolbar } from 'react-bootstrap';
import Redirect from 'react-router-dom/Redirect';
import ExistingClub from '../ExistingClub'

class SignUpFormChooseClubType extends Component {

    constructor(){
        super();
        this.state = {
            redirect: '',
            show:false,
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

   

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleOnClick = (page) => {
        this.setState({ redirect: page });
    }


    render() {
        if (this.state.redirect) {
            if (this.state.redirect == "existingClubRedirect") {
                return <Redirect push to="/existingClubRedirect" />
            }
            if (this.state.redirect == "newClubRedirect") {
                return <Redirect push to="/newClub" />
            }
        }
        return (
            <React.Fragment>
                <ButtonToolbar bsSize="large">
                    <Button bsStyle="primary" type="button" onClick={this.handleShow}>Existing Club</Button>
                    <Button bsStyle="primary" type="button" onClick={() => this.handleOnClick('newClubRedirect')}>Register Club</Button>
                </ButtonToolbar>
                <ExistingClub show={this.state.show} hide={this.handleClose}/>
            </React.Fragment>
        );
    }
}

export default SignUpFormChooseClubType;


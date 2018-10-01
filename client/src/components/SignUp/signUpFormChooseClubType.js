import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Button, ButtonToolbar } from 'react-bootstrap';
import Redirect from 'react-router-dom/Redirect';

class SignUpFormChooseClubType extends Component {

    state = {
        redirect: '',
    }

    handleOnClick = (page) => {
        this.setState({redirect: page});
      }


    render() {
        if(this.state.redirect){
           if(this.state.redirect == "existingClubRedirect"){
              return <Redirect push to="/existingClubRedirect" />
           }
           if(this.state.redirect == "newClubRedirect"){
            return <Redirect push to="/newClub" />
        }
        }
        return (
            <ButtonToolbar bsSize="large">
                <Button bsStyle="primary" type="button" onClick={() => this.handleOnClick('existingClubRedirect')}>Existing Club</Button>
                <Button bsStyle="primary" type="button"  onClick={() =>  this.handleOnClick('newClubRedirect')}>Register Club</Button>
            </ButtonToolbar>
        );
    }
}

export default SignUpFormChooseClubType;


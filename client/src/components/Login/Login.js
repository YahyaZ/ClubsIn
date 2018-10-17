import React, { Component } from 'react';
import Form from '../Form';
import LoginForm from './LoginForm';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            errorMessage: '',
        }

        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    setErrorMessage = (message) => {
        this.setState({errorMessage: message});
    }

    render() {
        const { childProps } = this.props; // eslint-disable-line
        const { errorMessage } = this.state; // eslint-disable-line
        return (
            // Renders the Form
            <Form
                formBody={<LoginForm authenticate={childProps.authenticate} setErrorMessage={this.setErrorMessage} />}
                tagline="Log in to manage your club"
                footerText="Don't have an account yet?"
                footerLinkText="Sign up here"
                footerLink="/signup"
                errorMessage={errorMessage}
            />
        );
    }
}

export default Login;

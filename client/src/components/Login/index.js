import React, { Component } from 'react';
import Form from '../Form';
import LoginForm from './LoginForm';

class Login extends Component {
    render() {
        const { childProps } = this.props; // eslint-disable-line
        return (
            // Renders the Form
            <Form
                formBody={<LoginForm authenticate={childProps.authenticate} />}
                tagline="Log in to manage your club"
                footerText="Don't have an account yet?"
                footerLinkText="Sign up here"
                footerLink="/signup"
            />
        );
    }
}

export default Login;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import Form from '../Form';
import SignUpFormStart from './signUpFormStart';

/* Form container for signing up a new user */
class SignUp extends Component {

    constructor(){
        super();
        this.state = {
            errorMessage: '',
        }

        this.setErrorMessage = this.setErrorMessage.bind(this);
        
    }

    componentDidMount() {
        document.title = "Sign Up - club'in";
    }



    setErrorMessage = (message) => {
        this.setState({errorMessage: message})
    }

    render() {
        const { errorMessage } = this.state;
        const { setErrorMessage,props } = this;
        return (
            <div>
                <Form
                    formBody={(
                            <SignUpFormStart
                                {...props}
                               handleErrorMessage={setErrorMessage}
                            />
                    )}
                    tagline="Start Managing your club today!"
                    footerText="Already have an account"
                    footerLinkText="Log in here"
                    footerLink="/login"
                    errorMessage={errorMessage}
                />
            </div>
        );
    }
}

export default SignUp;

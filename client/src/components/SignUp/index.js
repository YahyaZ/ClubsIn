import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import Form from '../Form';
import SignUpFormStart from './signUpFormStart';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            input: {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordConf: '',
            },
            loading: false,
        };

        //this.goToPage = this.goToPage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputClubChange = this.handleInputClubChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        document.title = "Sign Up - club'in";
    }

    handleInputChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            input: {
                ...state.input,
                ...newPartialInput,
            },
        }));
    }

    handleInputClubChange(newPartialInput) {
        this.setState(state => ({
            ...state,
            input: {
                ...state.input,
                club: {
                    ...state.input.club,
                    ...newPartialInput,
                },
            },
        }));
    }

    updateUser() {
        this.goToPage('chooseClubType');
    }

    submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        const self = this;
        const { input } = this.state;
        self.setState({ loading: true });
        fetch('/api/user/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then((response) => {
            if (response.status === 400) {
                response.json().then((data) => {
                    self.setState({
                        errorMessage: data.error,
                        loading: false,
                    });
                });
            } else if (response.status === 200) {
                response.json().then((data) => {
                    localStorage.setItem('User', JSON.stringify(data));
                    self.setState({ redirect: true, loading: false });
                });
            } /** TODO: WHEN YOU ADD SIGN UP ROUTING do loading:false too in your setState */
        });
    }


    render() {
        const { redirect, loading, errorMessage } = this.state;
        // If Redirect is true, redirect the page to the club page
        if (redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <Form
                    formBody={(
                        <div>
                            <SignUpFormStart
                                buttonClick={this.submitForm}
                                handleInputChange={this.handleInputChange}
                            />
                            <BarLoader
                                loading={loading}
                                width="480"
                                height="10"
                                color="#0B58B6"
                            /> <br />
                        </div>
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

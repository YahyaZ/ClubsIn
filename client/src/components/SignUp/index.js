import React, { Component } from 'react';
import Form from '../Form';
import SignUpFormStart from './signUpFormStart';
import SignUpFormChooseClubType from './signUpFormChooseClubType';
import SignUpFormExistingClub from './signUpFormExistingClub';
import SignUpFormNewClub from './SignUpFormNewClub';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'start',
            errorMessage: '',
            input: {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordConf: '',
            },
        };

        this.goToPage = this.goToPage.bind(this);
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

    goToPage(pageName) {
        this.setState({
            page: pageName,
        });
    }

    submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        let self = this;
        const { input } = this.state;
        fetch('/api/user/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then(function(response){
            if(response.status == 400){
                response.json().then(
                   data => self.setState({errorMessage: data.error})
                );
                
                }
            })
        };


    render() {
        return (
            <div>
                 <Form
                    formBody={(
                        <SignUpFormStart
                            buttonClick={this.submitForm}
                            handleInputChange={this.handleInputChange}
                        />
                    )}
                    tagline="Start Managing your club today!"
                    footerText="Already have an account"
                    footerLinkText="Log in here"
                    footerLink="/login"
                    errorMessage={this.state.errorMessage}
                />
            </div>
        );
    }
}

export default SignUp;

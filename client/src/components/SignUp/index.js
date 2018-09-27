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
            input: {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordConf: '',
                club: {
                    name: '',
                    type: '',
                    university: '',
                },
            },
        };

        this.goToPage = this.goToPage.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
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
        const { input } = this.state;
        fetch('/api/user/signup', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then(response => response.json());
        /* .then((data) => {
            console.log(data);
        }); */
    }

    renderSwitch() {
        const { page } = this.state;
        switch (page) {
        case 'start':
            return (
                <Form
                    formBody={(
                        <SignUpFormStart
                            buttonClick={this.updateUser}
                            handleInputChange={this.handleInputChange}
                        />
                    )}
                    tagline="Start Managing your club today!"
                    footerText="Already have an account"
                    footerLinkText="Log in here"
                    footerLink="/login"
                />
            );
        case 'chooseClubType':
            return (
                <Form
                    formBody={(
                        <SignUpFormChooseClubType
                            existingClubButtonClick={() => this.goToPage('existingClub')}
                            newClubButtonClick={() => this.goToPage('newClub')}
                        />
                    )}
                    tagline="Are you joining an existing club or registering a new club"
                />
            );
        case 'existingClub':
            return (
                <Form
                    formBody={(
                        <SignUpFormExistingClub
                            buttonClick={() => this.goToPage('start')}
                            handleInputChange={this.handleInputClubChange}
                        />
                    )}
                    tagline="Find your Club!"
                    footerText="Haven't registered your club yet?"
                    footerLinkText="Create one here"
                    footerLinkClick={() => this.goToPage('newClub')}
                />
            );
        case 'newClub':
            return (
                <Form
                    formBody={(
                        <SignUpFormNewClub
                            buttonClick={this.submitForm}
                            handleInputChange={this.handleInputClubChange}
                        />
                    )}
                    tagline="Register your Club Now!"
                    footerText="Already registered your club yet?"
                    footerLinkText="Find it here"
                    footerLinkClick={() => this.goToPage('existingClub')}
                />
            );
        default:
            return (
                <p>404 - Page Not Found</p>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderSwitch()}
            </div>
        );
    }
}

export default SignUp;

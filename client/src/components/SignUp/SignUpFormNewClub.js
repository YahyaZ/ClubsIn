import React, { Component } from 'react';
import { FaUniversity } from 'react-icons/fa';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Form from '../Form';

class SignUpFormNewClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            input: {
                university: '',
                name: '',
                type: '',
            },
            fetched: false,
        };

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        const self = this;
        fetch('/api/university')
            .then(response => response.json())
            .then((data) => {
                self.setState({
                    universities: data,
                    fetched: true,
                });
            });
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

    submitForm(e) {
        const self = this;
        e.preventDefault();
        e.stopPropagation();
        const { input } = this.state;
        fetch('/api/club/create', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        }).then((response) => {
            // Some sort of error in the User field
            if (response.status === 400) {
                response.json().then((data) => {
                    self.setState({ message: data.error });
                });
            } else if (response.status === 200) {
                response.json().then((data) => {
                    const existingUser = JSON.parse(localStorage.getItem('User'));
                    existingUser.clubs.push(data._id);
                    localStorage.setItem('User', JSON.stringify(existingUser));
                    self.setState({ redirect: true });
                });
            }
        });
    }

    renderForm() {
        const { redirect, fetched, universities } = this.state;
        if (redirect) {
            return <Redirect push to="/" />;
        }
        return (
            <form className="form-body" onSubmit={this.submitForm}>
                <FormGroup controlId="universityControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity /></InputGroup.Addon>
                        {fetched
                            ? (
                                <FormControl
                                    componentClass="select"
                                    placeholder="University/College"
                                    onChange={e => (
                                        this.handleInputChange({ university: e.target.value })
                                    )}
                                >
                                    <option disabled selected key={-1} value="">Select a University</option>
                                    {universities.map(uni => (
                                        <option key={uni._id} value={uni._id}>{uni.name}</option>
                                    ))}
                                </FormControl>
                            )
                            : <FormControl readOnly type="text" placeholder="Loading..." />
                        }
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity /></InputGroup.Addon>
                        <FormControl
                            type="text"
                            placeholder="Club Name"
                            name="clubName"
                            onChange={e => this.handleInputChange({ name: e.target.value })}
                        />
                    </InputGroup>
                </FormGroup>
                <FormGroup controlId="clubTypeControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity /></InputGroup.Addon>
                        <FormControl
                            componentClass="select"
                            placeholder="Club Type"
                            name="clubType"
                            onChange={e => this.handleInputChange({ type: e.target.value })}
                        >
                            <option disabled selected key={-1} value="">Choose a type</option>
                            <option value="Religious">Religious </option>
                            <option value="Faculty">Faculty </option>
                            <option value="Culture">Culture </option>
                            <option value="Sports">Sports </option>
                            <option value="Gaming">Gaming</option>
                            <option value="Creative">Creative</option>
                            <option value="Politcal">Politcal </option>
                            <option value="Social Justice">Social Justice</option>
                        </FormControl>
                    </InputGroup>
                </FormGroup>
                <button className="form-button" type="submit">Continue</button>
            </form>
        );
    }

    render() {
        return (
            <div className="form-container">
                <Form
                    formBody={(this.renderForm())}
                    tagline="Register your Club Now!"
                    footerText="Already registered your club yet?"
                    footerLinkText="Find it here"
                    footerLinkClick={() => this.goToPage('existingClub')}
                />
            </div>
        );
    }
}

export default SignUpFormNewClub;

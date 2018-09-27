import React, { Component } from 'react';
import { FaUniversity } from 'react-icons/fa';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SignUpFormNewClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            fetched: false,
        };
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

    render() {
        const { buttonClick, handleInputChange } = this.props;
        const { fetched, universities } = this.state;
        return (
            <form className="form-body" onSubmit={buttonClick}>
                <FormGroup controlId="universityControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity /></InputGroup.Addon>
                        {fetched
                            ? (
                                <FormControl
                                    componentClass="select"
                                    placeholder="University/College"
                                    onChange={e => (
                                        handleInputChange({ university: e.target.value })
                                    )}
                                >
                                    <option readOnly disabled key={-1}>Select a University</option>
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
                            onChange={e => handleInputChange({ name: e.target.value })}
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
                            onChange={e => handleInputChange({ type: e.target.value })}
                        >
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
}

export default SignUpFormNewClub;

SignUpFormNewClub.propTypes = {
    buttonClick: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
};

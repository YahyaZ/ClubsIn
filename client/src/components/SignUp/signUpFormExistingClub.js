import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaUniversity } from 'react-icons/fa';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class SignUpFormExistingClub extends Component {
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
            .then(data => (
                self.setState({
                    universities: data,
                    fetched: true,
                })
            ));
    }

    render() {
        const { fetched, universities } = this.state;
        const { handleInputChange, buttonClick } = this.props;
        return (
            <form className="form-body">
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
                                    {universities.map(uni => (
                                        <option key={uni._id} value={uni._id}>{uni.name}</option>
                                    ))}
                                </FormControl>
                            )
                            : <FormControl disabled type="text" placeholder="Loading..." />
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
                <button type="button" className="form-button" onClick={buttonClick}>Continue</button>
            </form>
        );
    }
}

export default SignUpFormExistingClub;

SignUpFormExistingClub.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    buttonClick: PropTypes.func.isRequired,
};

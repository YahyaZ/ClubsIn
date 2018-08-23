import React, { Component } from "react";
import { FaUniversity} from "react-icons/fa";
import { FormGroup, InputGroup, FormControl } from "react-bootstrap";

class SignUpFormNewClub extends Component{    
    render(){
        return (
            <form className="form-body">
                <FormGroup controlId="universityControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl componentClass="select" placeholder="University/College" name="university">
                            <option value="UTS">UTS</option>
                            <option value="UNSW">UNSW</option>
                        </FormControl>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl type="text" placeholder="Club Name" name="clubName" />
                    </InputGroup>
                </FormGroup>
                <FormGroup controlId="clubTypeControlsSelect">
                    <InputGroup>
                        <InputGroup.Addon><FaUniversity/></InputGroup.Addon>
                        <FormControl componentClass="select" placeholder="Club Type" name="clubType">
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
                <button className="form-button" onClick={this.props.buttonClick}>Continue</button>
            </form>
        )
    }
}

export default SignUpFormNewClub;
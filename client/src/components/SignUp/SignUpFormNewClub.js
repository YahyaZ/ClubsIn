import React, { Component } from "react";
import { FaUniversity} from "react-icons/fa";

class SignUpFormNewClub extends Component{    
    render(){
        return (
            <form className="form-body">
                <div className="input-container">
                    <FaUniversity className="icon"/>
                    <select className="input-field" name="university" >
                        <option value="" disabled selected>University/College</option>
                        <option value="UTS">UTS </option>
                        <option value="UNSW">UNSW </option>
                    </select>
                </div>
                <div className="input-container">
                    <FaUniversity className="icon"/>
                    <input className="input-field" type="text" placeholder="Club Name" name="clubName" />
                </div>
                <div className="input-container">
                    <FaUniversity className="icon"/>
                    <select className="input-field" name="clubType" >
                        <option value="" disabled selected>Club Type</option>
                        <option value="Religious">Religious </option>
                        <option value="Faculty">Faculty </option>
                        <option value="Culture">Culture </option>
                        <option value="Sports">Sports </option>
                        <option value="Gaming">Gaming</option>
                        <option value="Creative">Creative</option>
                        <option value="Politcal">Politcal </option>
                        <option value="Social Justice">Social Justice</option>
                    </select>
                </div>
                <button className="form-button" onClick={this.props.buttonClick}>Continue</button>
            </form>
        )
    }
}

export default SignUpFormNewClub;
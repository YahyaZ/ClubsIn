import React, { Component } from "react";
import { FaEnvelope, FaLock, FaUser, FaUniversity} from "react-icons/fa";
import Form from "../Form";

class SignUpForm extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <form className="form-body">
                <div className="input-container">
                    <FaUser className="icon"/>
                    <input className="input-field" type="text" placeholder="First Name" name="firstName" />
                </div>
                <div className="input-container">
                    <FaUser className="icon"/>
                    <input className="input-field" type="text" placeholder="Last Name" name="lastName" />
                </div>
                <div className="input-container">
                    <FaEnvelope className="icon"/>
                    <input className="input-field" type="email" placeholder="Email Address" name="email" />
                </div>
                <div className="input-container">
                    <FaLock className="icon"/>
                    <input className="input-field" type="password" placeholder="Password" name="password" />
                </div>
                <div className="input-container">
                    <FaLock className="icon"/>
                    <input className="input-field" type="password" placeholder="Repeat Password" name="repeatPassword" />
                </div>
                <div className="form-body-footer" >
                    <div className="form-checkbox">
                        <input type="checkbox" name="agreedToTermsAndConditions" />
                        <label>I agree to the terms and conditions</label>
                    </div>
                </div>
                <button className="form-button" onClick={this.props.buttonClick}>Sign Up</button>
            </form>
        )
}
}

class SignUpFormChooseClubType extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <button className="form-button" onClick={this.props.existingClubButtonClick}>Existing Club</button>
                <button className="form-button" onClick={this.props.newClubButtonClick}>Register Club</button>
            </div>
        )
    }
}

class SignUpFormExistingClub extends Component{
    constructor(props){
        super(props);
    }
    
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
                <button className="form-button" onClick={this.props.buttonClick}>Continue</button>
            </form>
        )
    }
}

class SignUpFormNewClub extends Component{
    constructor(props){
        super(props);
    }
    
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

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'start',
        }

        this.goToPage = this.goToPage.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
    }

    goToPage(pageName) {
        this.setState({
            page: pageName,
        }) 
    }

    renderSwitch(){
        switch(this.state.page){
            case 'start':
                return (
                    <Form   formBody={<SignUpForm buttonClick={() => this.goToPage('chooseClubType')} />} 
                            tagline="Start Managing your club today!" 
                            footerText="Already have an account"
                            footerLinkText="Log in here" />
                );
            case 'chooseClubType':
                return (
                    <Form   formBody={<SignUpFormChooseClubType 
                                        existingClubButtonClick={() => this.goToPage('existingClub')} 
                                        newClubButtonClick={() => this.goToPage('newClub')} />} 
                            tagline="Are you joining an existing club or registering a new club"
                            />
                );
            case 'existingClub':
                return(
                    <Form   formBody={<SignUpFormExistingClub buttonClick={() => this.goToPage('start')}/>} 
                            tagline="Find your Club!"
                            footerText="Haven't registered your club yet?"
                            footerLinkText="Create one here"
                            />
                );
            case 'newClub':
                return(
                    <Form   formBody={<SignUpFormNewClub buttonClick={() => this.goToPage('start')} />} 
                            tagline="Register your Club Now!"
                            footerText="Already registered your club yet?"
                            footerLinkText="Find it here"
                            />
                )

        }
    }

    render() {
        return(
            <div>
                {this.renderSwitch()}
            </div>
        )
    }
}

export default SignUp;
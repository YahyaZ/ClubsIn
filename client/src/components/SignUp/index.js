import React, { Component } from "react";
import Form from "../Form";
import SignUpFormStart from "./signUpFormStart";
import SignUpFormChooseClubType from "./signUpFormChooseClubType";
import SignUpFormExistingClub from "./signUpFormExistingClub";
import SignUpFormNewClub from "./SignUpFormNewClub";



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
                    <Form   formBody={<SignUpFormStart buttonClick={() => this.goToPage('chooseClubType')} />} 
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

import { FaFrown } from 'react-icons/fa';
import React, { Component } from 'react';
import SignUpFormChooseClubType from '../SignUp/signUpFormChooseClubType'
import { Link } from 'react-router-dom'


class ClubSection extends Component {

    renderNoClubs() {
        return (
            <div>
                It doesn't seem you are currently in any clubs <FaFrown />
                {this.renderNewClubs()}
            </div>
        )
    }

    renderNewClubs() {
        return (
            <div>
                Join an existing one or create a new one!
                <br />
                <SignUpFormChooseClubType />
            </div>
        )
    }

    renderClubs() {
        return (
            <div>
                Go to a club page:
                {this.props.clubs.map(function(club){
                   return <ul><Link to="/">{club}</Link></ul>
                })}
            {this.renderNewClubs()}
            </div>
        );

    }

    render() {
        let hasClubs = this.props.clubs.length == 0;
        return (
            <div>
                {hasClubs ? this.renderNoClubs() : this.renderClubs()}
            </div>
        )
    }
};

export default ClubSection;

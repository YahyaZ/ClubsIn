
import { FaFrown } from 'react-icons/fa';
import React, { Component } from 'react';
import SignUpFormChooseClubType from '../SignUp/signUpFormChooseClubType'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const ClubBox = (props) => (

    <Link to={`/club/${props.club._id}`} >
        <div className="box"> 
            <p>{props.club.name}</p>
        </div>
    </Link>

)

class ClubSection extends Component {

    state = {
        clubs: []
    }


    componentDidMount() {
        let self = this;
        fetch('/api/club?q=name', {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return [];
            }
            return response.json();
        }).then((clubs) => {
            self.setState({ clubs });
        });
    }

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
                <div className="club-container">
                    {this.state.clubs.map(function (club) {
                        return <ClubBox key={club._id} club={club} />
                    })}
                </div>
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


import { FaFrown } from 'react-icons/fa';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignUpFormChooseClubType from '../SignUp/signUpFormChooseClubType';

const ClubBox = ({ club }) => (
    <Link to={`/club/${club._id}`}>
        <div className="box">
            <p>{club.name}</p>
        </div>
    </Link>
);

ClubBox.propTypes = {
    club: PropTypes.shape({}).isRequired,
};

class ClubSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
        };
    }

    componentDidMount() {
        const self = this;
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

    renderNoClubs = () => (
        <div>
            You are apart of no clubs <FaFrown />
        </div>
    );

    renderClubs() {
        const { clubs } = this.state;
        return (
            <div>
                Go to a club page:
                <div className="club-container">
                    {clubs.map(club => <ClubBox key={club._id} club={club} />)}
                </div>
            </div>
        );
    }

    render() {
        const { clubs } = this.props;
        return (
            <div>
                {clubs.length === 0 ? this.renderNoClubs() : this.renderClubs()}
                <div>
                    Join more clubs:
                    <br />
                    <SignUpFormChooseClubType />
                </div>
            </div>
        );
    }
}

export default ClubSection;

ClubSection.propTypes = {
    clubs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

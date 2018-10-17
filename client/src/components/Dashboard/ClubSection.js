
import { FaFrown } from 'react-icons/fa';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Skeleton from 'react-loading-skeleton';
import SignUpFormChooseClubType from '../SignUp/signUpFormChooseClubType';

const styles = {
    card: {
        maxWidth: 300,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
    },
};


const ClubBox = ({ club }) => {
    if (club) {
        return (
            <Link to={`/club/${club._id}`}>
                <Card style={styles.card}>
                    <CardActionArea style={{ width: '100%' }}>
                        <CardContent>
                            <Typography gutterBottom variant="display1" component="h4" style={{ textAlign: 'center' }}>
                                {club.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ justifyContent: 'center' }}>
                        <Button size="large" color="secondary">
                            View Club
                            <ArrowForward />
                        </Button>
                    </CardActions>
                </Card>
            </Link>
        );
    }
    return (
        <Card style={styles.card}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                        <p>
                            <Skeleton width={120} />
                        </p>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button size="large" color="secondary">
                    <p>
                        <Skeleton width={80} />
                    </p>
                </Button>
            </CardActions>
        </Card>
    );
};


ClubBox.defaultProps = {
    club: {},
};

ClubBox.propTypes = {
    club: PropTypes.shape({}),
};

class ClubSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clubs: [],
            loaded: false,
        };

        this.rerender = this.rerender.bind(this);
    }

    componentDidMount() {
        this.getClubs();
    }

    getClubs() {
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
            self.setState({ clubs, loaded: true });
        });
    }

    rerender = () => {
        this.getClubs();
    }

    renderNoClubs = () => (
        <div>
            You are apart of no clubs <FaFrown />
        </div>
    );

    renderClubs() {
        const { clubs, loaded } = this.state;
        return (
            <div>
                Go to a club page:
                <div className="club-container">
                    {loaded
                        ? clubs.map(club => <ClubBox key={club._id} club={club} />)
                        : [1, 2, 3].map(i => <ClubBox key={i} />)
                    }
                </div>
            </div>
        );
    }

    render() {
        const { clubs, loaded } = this.state;
        let clubsToRender = this.renderClubs();
        if (loaded && clubs.length === 0) clubsToRender = this.renderNoClubs();
        return (
            <div>
                {clubsToRender}
                <div>
                    Join more clubs:
                    <br />
                    <SignUpFormChooseClubType rerender={this.rerender} />
                </div>
            </div>
        );
    }
}

export default ClubSection;

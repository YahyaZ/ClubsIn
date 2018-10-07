import React, { Component } from 'react';
import { Grid, Row, Well } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ClubSection from './ClubSection';
import UserManagement from './UserManagment';
import './dashboard.css';
import Update from '../ChangePassword';

const DashboardSection = (props) => {
    const { title, component } = props;
    return (
        <Row>
            <Well bsStyle="normal">
                <h2>{title}</h2>
                {component}
            </Well>
        </Row>

    );
};

DashboardSection.propTypes = {
    title: PropTypes.string.isRequired,
    component: PropTypes.element.isRequired,
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                clubs: [],
            },
        };
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('User'));
        if (user) {
            this.setState({
                user,
            });
        }
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <Grid>
                    <br/>
                    <DashboardSection title="User Management" component={<UserManagement user={user} />} />
                    <DashboardSection title="Clubs" component={<ClubSection clubs={user.clubs} />} />
                    <DashboardSection title="Upcoming Events" component={<div>This is where they can find upcoming events</div>} />
                    <DashboardSection title="Assigned Tasks" component={<div>This is where they can get assigned tasks</div>} />
                    <DashboardSection title="Settings" component={<Update email={user.email} />} />
                </Grid>
            </div>
        );
    }
}

export default Dashboard;

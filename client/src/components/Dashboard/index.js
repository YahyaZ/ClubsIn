import React, { Component } from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import ClubSection from './ClubSection';
import UserManagement from './UserManagment';
import './dashboard.css'
import Update from '../ChangePassword'

const DashboardSection = (props) => {
    return (
        <Row >
            <Well bsStyle="normal">
                <h2>{props.title}</h2>
                {props.component}
            </Well>
        </Row>

    )
}
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                clubs: [],
            }
        }
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
                    <DashboardSection title="User Management" component={<UserManagement user={this.state.user} />} />
                    <DashboardSection title="Clubs" component={<ClubSection clubs={this.state.user.clubs} />}/>
                    <DashboardSection title="Upcoming Events" component={<div>This is where they can find upcoming events</div>} />
                    <DashboardSection title="Assigned Tasks" component={<div>This is where they can get assigned tasks</div>} />
                    <DashboardSection title="Settings" component={<Update user={user} />} />
                </Grid>
            </div>
        )
    }
};

export default Dashboard;

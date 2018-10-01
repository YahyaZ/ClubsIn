import React, { Component } from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import ClubSection from './ClubSection';
import UserManagement from './UserManagment';
import './dashboard.css'

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
    constructor() {
        super();
        let user = JSON.parse(localStorage.getItem('User'));
        this.state = {
            user,
        }
    }

       render() {
        return (
            <div>
                <Grid>
                    <DashboardSection title="User Management" component={<UserManagement user={this.state.user} />} />
                    <DashboardSection title="Clubs" component={<ClubSection clubs={this.state.user.clubs} />}/>
                    <DashboardSection title="Upcoming Events" component={<div>This is where they can find upcoming events</div>} />
                    <DashboardSection title="Assigned Tasks" component={<div>This is where they can get assigned tasks</div>} />
                </Grid>
            </div>
        )
    }
};

export default Dashboard;

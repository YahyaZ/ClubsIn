import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Event from '../../components/Events';
import './Club.css';

const profileAPI = '/api/user/profile';

class Club extends Component {
    constructor() {
        super();
        this.getEvents = this.getEvents.bind(this);
        this.getMyEvents = this.getMyEvents.bind(this);
        this.state = {
            authorised: true,
        };

        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    componentDidMount() {
        const self = this;
        fetch(profileAPI, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                self.setRedirect();
            }
            return response.json();
        });// .then(data => this.setState({ data }));
    }

    getEvents = () => []

    getMyEvents = () => []

    setRedirect = () => {
        this.setState({
            authorised: false,
        });
    }

    renderRedirect = () => {
        const { authorised } = this.state;
        if (!authorised) {
            return <Redirect to="/login" />;
        }
        return '';
    }

    renderEvents = (eventType, events) => (
        <div className="events-container">
            <h2>
                {eventType}
            </h2>
            <div className="events-list">
                {events.map(e => (
                    <Event
                        date={e.date}
                        name={e.name}
                        link={e.link}
                        members={e.members}
                        key={e.name}
                    />
                ))}
            </div>
        </div>
    )

    renderNoEvents = () => (
        <div className="events-container no-events">
            <h1>Sorry no events! :(</h1>
        </div>
    )

    render() {
        const myEvents = this.getMyEvents();
        const allEvents = this.getEvents(); // []; //for no events

        return (
            <div>
                {this.renderRedirect()}
                {
                    /*
                     * <div className="events-container">Current User : {this.state.firstName}</div>
                     */
                }
                {myEvents.length > 0 ? this.renderEvents('My Events', myEvents) : this.renderNoEvents()}
                {allEvents.length > 0 ? this.renderEvents('All Events', allEvents) : this.renderNoEvents()}
            </div>
        );
    }
}

export default Club;

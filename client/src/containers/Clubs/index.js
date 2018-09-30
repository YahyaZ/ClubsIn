import React, { Component } from 'react';
import Event from '../../components/Events';
import './Club.css';

class Club extends Component {
    constructor() {
        super();

        this.state = {
            myEvents: [],
            allEvents: [],
        };

        this.getEvents = this.getEvents.bind(this);
        this.getMyEvents = this.getMyEvents.bind(this);
    }

    componentDidMount() {
        const myEvents = this.getMyEvents();
        const allEvents = this.getEvents();

        this.setState({
            myEvents,
            allEvents,
        });
    }

    getEvents = () => []

    getMyEvents = () => []

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
        const { myEvents, allEvents } = this.state;

        return (
            <div>
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

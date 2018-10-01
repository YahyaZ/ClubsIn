import React, { Component } from 'react';
import Event from '../../components/Events';
import './Club.css';

// TODO: Actually get ID's from session
const clubId = '5ba6df946695553b38e2098d';
const userId = '5bb0639c99ec5216f478c17f';
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
        this.getEvents();
    }

    getEvents = () => {
        const self = this;
        fetch(`/api/club/${clubId}/events`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return [];
            }
            return response.json();
        }).then((allEvents) => {
            self.setState({ allEvents });
            this.getMyEvents(allEvents);
        });
    }

    getMyEvents = (events) => {
        const myEvents = events.reduce((result, event) => {
            event.tasks.forEach((task) => {
                task.assignee.forEach((assigneeId) => {
                    if (assigneeId === userId
                        && !result.find(ev => event._id === ev._id)) {
                        result.push(event);
                    }
                });
            });
            return result;
        }, []);

        this.setState({ myEvents });
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
                        members={e.users}
                        link={e._id}
                        key={e._id}
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

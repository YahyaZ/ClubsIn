import React, { Component } from 'react';
import Event from '../../components/Events';
import Skeleton from 'react-loading-skeleton';
import './Club.css';

class Club extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myEvents: [1, 2, 3],
            allEvents: [1, 2, 3],
            userId: JSON.parse(localStorage.getItem('User')).id,
            // ignore eslint as match is built in prop
            clubId: props.match.params.clubId, //eslint-disable-line
        };

        this.getEvents = this.getEvents.bind(this);
        this.getMyEvents = this.getMyEvents.bind(this);
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        const self = this;
        const { clubId } = this.state;
        fetch(`/api/club/${clubId}`, {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return 'Error';
            }
            return response.json();
        }).then((club) => {
            self.setState({ club });
            document.title = `${club.name} - Club'in`;
        });

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
        const { userId } = this.state;
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
        <div className="events-container events-margin ">
            <h2>
                {eventType}
            </h2>
            <div className="events-list">
                {events.map(e => (
                    <Event
                        date={e.date}
                        name={e.name}
                        members={e.users}
                        link={e._id ? `/club/${this.state.clubId}/event/${e._id}` : ''} // eslint-disable-line
                        key={e._id || e}
                    />
                ))}
            </div>
        </div>
    )

    renderNoEvents = eventType => (
        <div className="events-container no-events">
            <h2>{eventType}</h2>
            <h1>No events found</h1>
        </div>
    )

    render() {
        const { myEvents, allEvents, club } = this.state;

        return (
            <div>
                <div className="events-container  events-transparent ">
                    <h2>{club ? club.name : <Skeleton width={200} />}</h2>
                </div>
                {myEvents.length > 0 ? this.renderEvents('My Events', myEvents) : this.renderNoEvents('My Events')}
                {allEvents.length > 0 ? this.renderEvents('All Events', allEvents) : this.renderNoEvents('All Events')}
                <br />
            </div>
        );
    }
}

export default Club;

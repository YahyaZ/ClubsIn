
import React, { Component } from 'react';
import Event from '../Events'

const styles = {
    card: {
        maxWidth: 300,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
    },
};


class EventSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [1,2,3],
            loaded: false,
        };

    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents() {
        const self = this;
        fetch('/api/event/upcoming?limit=3', {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                return [];
            }
            return response.json();
        }).then((events) => {
            self.setState({ events, loaded: true });
        });
    }

    rerender = () => {
        this.getEvents();
    }

    renderNoEvents = () => (
        <div>
            Looks like there are no events coming up!
        </div>
    );

    renderEvents() {
        const { events, loaded } = this.state;
        return (
            <div>
                Go to one of your upcoming events!
                <div className="club-container">
                    {loaded ? events.map(e => (
                        <Event
                            date={e.date}
                            name={e.name}
                            members={e.users}
                            link={`/club/${e.club_id._id}/event/${e._id}`} // eslint-disable-line
                            key={e._id}
                            clubName={e.club_id.name}
                        />
                    )) : [1, 2, 3].map(i => <Event key={i} />)}
                </div>
            </div>
        );
    }

    render() {
        const { events } = this.state;
        return (
            <div>
                {!this.state.loaded ? this.renderEvents() : (
                    events.length === 0 ? this.renderNoEvents() : this.renderEvents())}
            </div>
        );
    }
}

export default EventSection;


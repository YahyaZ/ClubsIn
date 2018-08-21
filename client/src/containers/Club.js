import React, { Component } from 'react';
import Event from '../components/Events/Event';
import './Club.css'

class Club extends Component {
    constructor() {
        super();
        this.getEvents = this.getEvents.bind(this);
        this.getMyEvents = this.getMyEvents.bind(this);
    }

    getEvents() {
        return [
            {
                date: "24 Aug",
                name: "Clubs Day",
                members: [
                    {
                        color: "#5A86DC",
                        name: "Ramu"
                    },
                    {
                        color: "#28DAA5",
                        name: "Malek"
                    },
                    {
                        color: "#FF7816",
                        name: "Yahya"
                    }
                ]
            },
            {
                date: "07 Sep",
                name: "Spider-Man Release date",
                members: [
                    {
                        color: "#FF7816",
                        name: "Yahya"
                    }
                ]
            },
            {
                date: "08 Sep",
                name: "Play Spider-man",
                members: [
                    {
                        color: "#28DAA5",
                        name: "Malek"
                    }
                ]
            }
        ]
    }

    getMyEvents() {
        return this.getEvents().filter(ev => {
            for (var i = 0; i < ev.members.length; i++) {
                if (ev.members[i].name === "Yahya") {
                    return true;
                }
            }
            return false;
        })
    }

    render() {
        return (
            <div>
                <div className="events-container">
                    <h2>My Events</h2>
                    <div className="events-list">
                        {this.getMyEvents().map((e, i) => 
                            <Event date={e.date} name={e.name} members={e.members} key={i}/>
                        )}
                    </div>
                </div>
                <div className="events-container">
                    <h2>All Events</h2>
                    <div className="events-list">
                        {this.getEvents().map((e, i) => 
                            <Event date={e.date} name={e.name} members={e.members} key={i}/>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Club;
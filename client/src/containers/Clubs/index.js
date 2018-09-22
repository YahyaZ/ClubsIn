import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Event from '../../components/Events';
import './Club.css'

const profileAPI = "/api/user/profile"

class Club extends Component {
    constructor() {
        super();
        this.getEvents = this.getEvents.bind(this);
        this.getMyEvents = this.getMyEvents.bind(this);
        this.state = {
            authorised: true,
        }

        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    
        }

        setRedirect = () => {
            this.setState({
                authorised: false
            })
          }
          renderRedirect = () => {
            if (!this.state.authorised) {
              return <Redirect to='/login' />
            }
          }
    

    componentDidMount(){
        let self = this;
        fetch(profileAPI,{
            method: 'GET',
            mode:"cors",
        })
        .then(function(response){
            if(response.status === 401){
                console.log("User is unauthorised");
                self.setRedirect();
            }
            return response.json();
        }).then(data => this.setState({ data }))
    }


    getEvents() {
        return [
            {
                date: "24 Aug",
                name: "Clubs Day",
                link: "/event",
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
                link: "/event",
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
                link: "/event",
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

    renderEvents(eventType, events) {
        return (
            <div className="events-container">
                <h2>{eventType}</h2>
                <div className="events-list">
                    {events.map((e, i) =>
                        <Event date={e.date} name={e.name} link={e.link} members={e.members} key={i}/>
                    )}
                </div>
            </div>
        )
    }

    renderNoEvents() {
        return (
            <div className="events-container no-events">
                <h1>Sorry no events! :(</h1>
            </div>
        )
    }

    render() {
        var myEvents = this.getMyEvents();
        var allEvents = this.getEvents(); // []; //for no events

        return (
            <div>
                {this.renderRedirect()}
                {/*<div className="events-container">Current User : {this.state.firstName}</div>*/}
                {myEvents.length > 0 ? this.renderEvents("My Events", myEvents) : this.renderNoEvents()}
                {allEvents.length > 0 ? this.renderEvents("All Events", allEvents) : this.renderNoEvents()}
            </div>
        );
    }
}

export default Club;
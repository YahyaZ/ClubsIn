import React from 'react';
import { Button, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Buttons shown on an event's tasks page */
const EventButtons = ({ match }) => ( // eslint-disable-line
    <NavItem
        componentClass={Link}
        href={`/club/${match.params.clubId}/event/${match.params.eventId}/task`}
        to={`/club/${match.params.clubId}/event/${match.params.eventId}/task`}
    >
        <Button bsStyle="primary">Add Task</Button>
    </NavItem>
);

export default EventButtons;

import React from 'react';
import { Button } from 'react-bootstrap';
import MenuLink from './MenuLink';

const EventButtons = ({ match }) => ( // eslint-disable-line
    <MenuLink
        to={{ pathname: `/club/${match.params.clubId}/event/${match.params.eventId}/task` }}
    >
        <Button bsStyle="primary">Add Task</Button>
    </MenuLink>
);

export default EventButtons;

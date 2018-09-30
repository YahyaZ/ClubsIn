import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Authentication from './containers/authentication';
import PropsRoute from './components/Routes/PropsRoute';
import Club from './containers/Clubs';
import EventTasks from './containers/EventTasks';

/* Routes for application */

export default () => (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Landing} />
                <PropsRoute path="/login" component={Authentication} type="login" />
                <PropsRoute path="/signup" component={Authentication} type="Sign Up" />
                <Route path="/club" component={Club} />
                <Route path="/event" component={EventTasks} />
            </Switch>
        </div>
    </Router>
);

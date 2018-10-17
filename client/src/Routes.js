import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Authentication from './containers/Authentication';
import PropsRoute from './components/Routes/PropsRoute';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import AddEvent from './components/Events/AddEvent';
import Club from './containers/Clubs';
import EventTasks from './containers/EventTasks';
import NotFound from './components/NotFound';
import SignUpNewClub from './components/SignUp/SignUpFormNewClub';
import AddTask from './components/AddTask';

/* Routes for application */

// disable lint for this one prop as I'm not entirely 100% on the props that gets fed
export default ({ childProps }) => ( // eslint-disable-line
    <Router>
        <div>
            <Header props={childProps} />
            <Switch>
                <PropsRoute
                    exact
                    path="/"
                    component={Landing}
                    props={childProps}
                />
                <PropsRoute
                    path="/login"
                    component={Authentication}
                    props={{
                        childProps,
                        type: 'login',
                    }}
                />
                <PropsRoute
                    path="/signup"
                    component={Authentication}
                    props={{
                        childProps,
                        type: 'Sign Up',
                    }}
                />
                <AuthenticatedRoute exact path="/club/:clubId" component={Club} props={childProps} />
                <AuthenticatedRoute path="/newClub" component={SignUpNewClub} props={childProps} />
                <AuthenticatedRoute exact path="/club/:clubId/event" component={AddEvent} props={childProps} />
                <AuthenticatedRoute exact path="/club/:clubId/event/:eventId" component={EventTasks} props={childProps} />
                <AuthenticatedRoute exact path="/club/:clubId/event/:eventId/task" component={AddTask} props={childProps} />
                <AuthenticatedRoute exact path="/club/:clubId/event/:eventId/task/:taskId" component={AddTask} props={childProps} />
                {/* Unmatched routes */}
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

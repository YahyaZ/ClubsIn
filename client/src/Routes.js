import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Authentication from './containers/authentication';
import PropsRoute from './components/Routes/PropsRoute';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import Club from './containers/Clubs';
import EventTasks from './containers/EventTasks';
import NotFound from './components/NotFound';
import SignUpNewClub from './components/SignUp/SignUpFormNewClub'

/* Routes for application */

// disable lint for this one prop as I'm not entirely 100% on the props that gets fed
export default ({ childProps }) => ( // eslint-disable-line react/prop-types
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
                <AuthenticatedRoute path="/club/:clubId" component={Club} props={childProps} />
                <AuthenticatedRoute path="/newClub" component={SignUpNewClub} props={childProps} />
                <Route path="/event" component={EventTasks} />
                {/* Unmatched routes */}
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
);

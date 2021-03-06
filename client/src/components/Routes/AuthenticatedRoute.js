import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Routes where you can only access if you are authenticated */

const AuthenticatedRoute = ({ component: C, props: childProps, ...rest }) => (
    <Route
        {...rest}
        render={props => childProps.isAuthenticated
            ? <C {...props} {...childProps} />
            : (
                <Redirect
                    to="/login"
                />
            )
        }
    />
);

export default AuthenticatedRoute;

AuthenticatedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    props: PropTypes.shape({}).isRequired,
};

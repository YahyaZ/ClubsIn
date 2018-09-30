import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
/* With props route, you can pass in props to a Route */

// return a Route with passed in props
const PropsRoute = ({ component: C, props: childProps, ...rest }) => (
    <Route
        {...rest}
        render={props => <C {...props} {...childProps} />}
    />
);

export default PropsRoute;

PropsRoute.defaultProps = {
    props: {},
};

PropsRoute.propTypes = {
    component: PropTypes.func.isRequired,
    props: PropTypes.shape({}),
};

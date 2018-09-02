import React from 'react';
import { Route } from 'react-router-dom';
/* With props route, you can pass in props to a Route */

// Create a react element with specified props
const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

// return a Route with passed in props
const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
}

export default PropsRoute;
import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => (
    <main>
        {children}
    </main>
);

export default App;

App.propTypes = {
    children: PropTypes.element.isRequired,
};

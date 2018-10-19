import React, { Component } from 'react';
import Routes from './Routes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
        };
        this.authenticate = this.authenticate.bind(this);
    }

    async componentDidMount() {
        this.authenticate();
    }

    /**
     * Can pass in an optional parameter if the user is logged in or, this will save time 
     * by not calling the backend again
     */
    authenticate = (isLoggedIn) => {
        const self = this;
        if (isLoggedIn) {
            self.setState({ isAuthenticating: false, isAuthenticated: isLoggedIn });
        } else {
            fetch('/api/user/profile', {
                method: 'GET',
                mode: 'cors',
            }).then((response) => {
                if (response.status === 401) {
                    self.setState({ isAuthenticating: false, isAuthenticated: false });
                } else {
                    self.setState({ isAuthenticated: true, isAuthenticating: false });
                }
            });
        }
    }

    render() {
        const { isAuthenticated, isAuthenticating } = this.state;
        const childProps = {
            isAuthenticated,
            authenticate: this.authenticate,
        };
        return (
            !isAuthenticating
            && (
                <main>
                    <Routes childProps={childProps} />
                </main>
            )
        );
    }
}

export default App;

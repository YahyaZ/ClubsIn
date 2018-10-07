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

    authenticate = (isLoggedIn) => {
        let self = this;
        console.log(isLoggedIn);
        if (isLoggedIn) {
            self.setState({ isAuthenticating: false, isAuthenticated: isLoggedIn })
        } else {
            fetch('/api/user/profile', {
                method: 'GET',
                mode: 'cors',
            }).then((response) => {
                console.log(response);
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

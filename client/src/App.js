import React, { Component } from 'react';
import Routes from './Routes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
        };
    }

    async componentDidMount() {
        const self = this;

        fetch('/api/user/profile', {
            method: 'GET',
            mode: 'cors',
        }).then((response) => {
            if (response.status === 401) {
                self.setState({ isAuthenticating: false });
            } else {
                self.setState({ isAuthenticated: true, isAuthenticating: false });
            }
        });
    }

    render() {
        const { isAuthenticated, isAuthenticating } = this.state;
        const childProps = {
            isAuthenticated,
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

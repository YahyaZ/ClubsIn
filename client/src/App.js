import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Authentication from './containers/authentication'
import Club from './containers/Club';

const Login = () => <Authentication type='login' />
const SignUp = () => <Authentication type='Sign Up' />

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Landing}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup"  component={SignUp}/>
                <Route path="/club" component={Club}/>
            </div>
        </Router>
    )
}

export default App;
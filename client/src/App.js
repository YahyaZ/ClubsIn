import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Landing}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
            </div>
        </Router>
    )
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';
import App from './App'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Header from './components/Header';
import Landing from './components/Landing';
import Club from './containers/Clubs';
import EventTasks from './containers/EventTasks';
import Authentication from './containers/authentication';
import PropsRoute from './components/Routes/PropsRoute';

ReactDOM.render((
    <App>
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <PropsRoute path='/login' component={Authentication} type='login'/>
                    <PropsRoute path='/signup' component={Authentication} type='Sign Up'/>
                    <Route path='/club' component={Club}/>
                    <Route path='/event' component={EventTasks}/>
                </Switch>
            </div>
        </Router>
    </App>
), document.getElementById('root'));
registerServiceWorker();

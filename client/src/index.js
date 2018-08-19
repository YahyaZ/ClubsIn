import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import App from './App'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
=======
import Home from './containers/home'
import Authentication from './containers/authentication'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Authentication />, document.getElementById('root'));
>>>>>>> authentication
registerServiceWorker();

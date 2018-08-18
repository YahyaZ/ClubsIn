import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/home'
import Authentication from './containers/authentication'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Authentication />, document.getElementById('root'));
registerServiceWorker();

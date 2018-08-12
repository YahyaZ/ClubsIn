import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/home'
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();

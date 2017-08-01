import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

render(
    (<App/>), document.getElementById('root')
);
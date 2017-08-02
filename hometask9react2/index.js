import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {addUser} from './actions'
import app from './reducers'
import App from './containers/App'

let store = createStore(app);

store.dispatch(addUser('Vasya'));
store.dispatch(addUser('Ivan'));
store.dispatch(addUser('Petya'));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
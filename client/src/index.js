// bootstraps the app & is primary location for REDUX configuration
    //importing materializeCSS
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';



import App from './components/App';
// reducers already combines the reducers
import reducers from './reducers'; // reaches into reducers/index.js

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.querySelector('#root'));
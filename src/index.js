import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import myReducer from './reducers/index';

let initialState = {
    todos:
        [
            {
                id: 1,
                text: 'mot ong sao sang hai ong sang sao'
            },
            {
                id: 2,
                text: 'hai ong sao sang sang chieu muon anh vang'
            },
            {
                id: 3,
                text: 'bon ong sang sao kia nam ong sao sang'
            },
            {
                id: 4,
                text: 'kia sau ong sang sao tren troi cao'
            },
        ],
    todo: {text: '', id: 0}
};

const store = createStore(myReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


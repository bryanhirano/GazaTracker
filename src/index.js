import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore } from "redux"
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import "./assets/bootstrap/css/bootstrap.min.css"
import { Provider } from "react-redux"
import reducer from "./reducers";
import middleware from "./middleware";


import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const store = createStore(reducer,middleware)

root.render(
    <Provider store={store}>
    <Router>
    <App />
    </Router>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

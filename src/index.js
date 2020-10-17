import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// const dialogsData = [
//     {id:1, name: "Dimych"},
//     {id:2, name: "Andrey"},
//     {id:3, name: "Sveta" },
//     {id:4, name: "Sasha" },
//     {id:5, name: "Viktor"},
//     {id:6, name: "Valera"},
// ];

// export {dialogsData}
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './js/App';
import reportWebVitals from './reportWebVitals';
import ReadUserModel from './js/readUserModel.js';
import {ReadRoomModel} from './js/readRoomModel.js';

let userModel = ReadUserModel();
let roomModel = ReadRoomModel();

export {userModel, roomModel};

//Create a react DOM
ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

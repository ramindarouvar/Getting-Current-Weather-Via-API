import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedErrors = 
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if(!expectedErrors){
        alert("در دریافت وب سرویس آب و هوا مشکلی از سمت سرور مربوطه رخ داده است.")
    }
    return Promise.reject(error);
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

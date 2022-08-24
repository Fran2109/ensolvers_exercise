import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  HashRouter } from 'react-router-dom';
import * as serviceWorker from "./utils/serviceWorker";

ReactDOM.render(
  <HashRouter>
      <App />
  </HashRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();

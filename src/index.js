import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";
import App from './views/app';
import "../src/common/styles/reset.css"
import 'antd-mobile/dist/antd-mobile.css';


ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
  </Router>
  ,
  document.getElementById('root')
);
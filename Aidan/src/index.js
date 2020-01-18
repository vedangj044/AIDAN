import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from '../App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Admin from "./components/Admin.js";

var hist = createBrowserHistory();

ReactDOM.render(<Router history={hist}>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </Router>,
  document.getElementById("root"));

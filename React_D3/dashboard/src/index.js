/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from './components/Dashboards.js';
import Map from './components/Map.js';


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/map" component={Map} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

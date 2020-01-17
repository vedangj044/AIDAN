import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
// import  from "./components/Dashboard.js";

var hist = createBrowserHistory();

ReactDOM.render(<Router history={hist}>
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/" component={Dashboard} />

      {/* <Route path="/blog-posts" component={BlogPostsPage} /> */}
    </Switch>
  </Router>,
  document.getElementById("root"));

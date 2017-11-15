import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import Login from './Login.jsx';
import App from './App.jsx';
import Home from './Home.jsx';
import ListData from './ListData.jsx';
import NewEntry from './NewEntry.jsx';
import ViewEntry from './ViewEntry.jsx';
import Page404 from './Page404.jsx';

const LoggedAppRoutes = () => (
  <BrowserRouter>
      <App>
        <Switch>
          <Route path="/app/home" component={Home} />
          <Route path="/app/list" component={ListData} />
          <Route path="/app/entry/add" component={NewEntry} />
          <Route path="/app/entry/view/:refId" component={ViewEntry} />
          <Route component={Page404} />
        </Switch>
      </App>
  </BrowserRouter>
);

const AppRoutes = () => (
  <BrowserRouter>
    <Route component={Login} />
  </BrowserRouter>
);

ReactDOM.render(
  (sessionStorage.getItem('logged')) ? <LoggedAppRoutes/> : <AppRoutes/>,
  document.getElementById('app')
);
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import Login from './Login.jsx';
import App from './App.jsx';
import Home from './Home.jsx';
import ListData from './ListData.jsx';
import NewEntry from './NewEntry.jsx';
import ViewEntry from './ViewEntry.jsx';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <App>
        <Route path="/app/home" component={Home}/>
        <Route path="/app/list" component={ListData}/>
        <Route path="/app/entry/add" component={NewEntry}/>
        <Route path="/app/entry/view/:refId" component={ViewEntry}/>
      </App>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <AppRoutes/>,
  document.getElementById('app')
);
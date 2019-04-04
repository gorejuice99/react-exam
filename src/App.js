import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import classes from './App.module.css';

import UsersContainer from './Containers/UsersContainer';
import UserInfo from './Containers/UserInfo/UserInfo';
class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Switch>
          <Route path="/" exact component={UsersContainer} />
          <Route path="/:id" exact component={UserInfo} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;

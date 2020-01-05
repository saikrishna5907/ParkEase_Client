import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
//component imports
import Layout from './hoc/Layout/layout';
import asyncComponent from './hoc/asyncComponent';
import HomePageComponent from './components/HomePage/homePage';
const parkingAreasComponent = asyncComponent(() => {
  return import('./containers/ParkingArea/parkingArea')
})
const parkingSpotsComponent = asyncComponent(() => {
  return import('./containers/ParkingSpots/parkingSpots')
})
const checkStatusComponent = asyncComponent(() => {
  return import('./containers/CheckStatus/checkStatus')
})
const authenticateComponent = asyncComponent(() => {
  return import('./containers/Authentication/authenticate')
})
const logoutComponent = asyncComponent(() => {
  return import('./containers/Authentication/Logout/logout')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={authenticateComponent} />
        <Route path="/" exact component={HomePageComponent} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkStatus" component={checkStatusComponent} />
          <Route path="/parkingAreas" component={parkingAreasComponent} />
          <Route path="/auth" component={authenticateComponent} />
          <Route path="/:areaName/parkingSpots" component={parkingSpotsComponent} />
          <Route path="/logout" component={logoutComponent} />
          <Route path="/" exact component={HomePageComponent} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

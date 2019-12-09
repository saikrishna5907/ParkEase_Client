import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//component imports
import Layout from './hoc/Layout/layout';
import HomePageComponent from './components/HomePage/homePage';
import ParkingAreasComponent from './containers/ParkingArea/parkingArea';
import ParkingSpotsComponent from './containers/ParkingSpots/parkingSpots';
const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/parkingAreas" component={ParkingAreasComponent} />
          <Route path="/:areaName/parkingSpots" component={ParkingSpotsComponent} />
          <Route path="/" exact component={HomePageComponent} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}
export default App;

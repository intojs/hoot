// @flow
import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import {CarsContainer} from "./components/cars/Cars.container";
import {EditCarContainer} from "./components/edit-car/EditCar.container";

export const App = () => (
  <Router>
    <div>
      <Navbar
        color="light"
        light expand="md"
      >
        <NavbarBrand tag={Link} to="/">Cars ;)</NavbarBrand>
      </Navbar>
      <div>
        <Route exact path="/" component={CarsContainer}/>
        <Route path="/edit/:id" component={EditCarContainer}/>
      </div>
    </div>
  </Router>
);

export default App;

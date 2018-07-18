// @flow
import type {ContextRouter} from 'react-router-dom';
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

import type {Car} from "../../domain/Car";
import {CarComponent} from "./Car.component";
import {getCarId} from "../../domain/Car.service";

type Props = {
  car: Car
};

class CarContainer extends Component<ContextRouter & Props> {
  onEdit() {
    this.props.history.push(`/edit/${getCarId(this.props.car)}`)
  }

  render() {
    return (
      <CarComponent
        car={this.props.car}
        edit={() => this.onEdit()}
      />
    );
  }
}

export default withRouter(CarContainer);

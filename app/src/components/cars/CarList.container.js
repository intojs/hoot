// @flow
import React, {Component} from 'react'
import {CardColumns} from "reactstrap";

import type {AppState} from "../../domain/AppState";
import type {Car} from "../../domain/Car";
import {store} from "../../store/store";
import CarContainer from "./Car.container";

type Props = {};

type State = {
  cars: Car[]
};

export class CarListContainer extends Component<Props, State> {
  subscriber: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      cars: []
    };

    this.subscriber = store.subscribe((appState: AppState) => {
      this.setState({cars: appState.cars});
    });
  }

  render() {
    return (
      <CardColumns>
        {
          this.state.cars.map((car: Car, index: number) => {
            return (
              <CarContainer
                car={car}
                key={index}
              />
            )
          })
        }
      </CardColumns>
    );
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscriber);
  }
}

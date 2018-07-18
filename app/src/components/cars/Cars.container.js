// @flow
import React, {Component} from 'react';
import {Container} from "reactstrap";

import {PaginationContainer} from "./Pagination.container";
import {CarListContainer} from "./CarList.container";
import {store} from "../../store/store";
import {getMeta} from "../../domain/AppState.service";
import {getCarsEffect} from "../../store/car.effects";

type Props = {};

export class CarsContainer extends Component<Props> {
  constructor(props: Props) {
    super(props);
    const state = store.getState();
    const {offset, limit} = getMeta(state);
    getCarsEffect(offset, limit);
  }

  render() {
    return (
      <Container className="mt-3">
        <CarListContainer/>
        <PaginationContainer/>
      </Container>
    );
  }
}

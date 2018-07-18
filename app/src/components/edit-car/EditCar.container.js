// @flow
import React, {Component} from 'react';
import type {ContextRouter} from 'react-router-dom';

import type {AppState} from "../../domain/AppState";
import type {EditCarForm} from "./EditCarForm";
import type {Car} from "../../domain/Car";
import {EditCarFormComponent} from "./EditCarForm.component";
import {getCarByIdEffect, patchCarEffect} from "../../store/car.effects";
import {store} from "../../store/store";
import {formatMpg, isCarNameValid, isMpgValid, updateCar} from "../../domain/Car.service";

export class EditCarContainer extends Component<ContextRouter, EditCarForm> {
  subscriber: Function;
  carToEdit: ?Car;

  state: EditCarForm = {
    carName: {
      value: '',
      valid: true
    },
    mpg: {
      value: 0,
      valid: true
    }
  };

  constructor(props: ContextRouter) {
    super(props);
    const {match: {params: {id}}} = props;
    if (id) {
      getCarByIdEffect(parseInt(id, 10));
    }

    this.subscriber = store.subscribe(({meta, carToEdit}: AppState) => {
      if (!this.carToEdit && carToEdit) {
        this.carToEdit = carToEdit;
        this.setState({
          carName: {
            ...this.state.carName,
            value: carToEdit.name
          },
          mpg: {
            ...this.state.mpg,
            value: carToEdit.mpg
          }
        });
      }
    })
  }

  onChangeCarName(e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      carName: {
        ...this.state.carName,
        value: e.target.value
      }
    });
  }

  onChangeMpg(e: SyntheticInputEvent<HTMLInputElement>) {
    const mpg = formatMpg(e.target.value);
    this.setState({
      mpg: {
        ...this.state.mpg,
        value: mpg || 0
      }
    });
  }

  markValidity(carNameValid: boolean, mpgValid: boolean) {
    this.setState({
      carName: {
        ...this.state.carName,
        valid: carNameValid
      },
      mpg: {
        ...this.state.mpg,
        valid: mpgValid
      }
    });
  }

  onSubmit() {
    const carNameValid = isCarNameValid(this.state.carName.value);
    const mpgValid = isMpgValid(this.state.mpg.value);
    this.markValidity(carNameValid, mpgValid);
    if (carNameValid && mpgValid) {
      if (this.carToEdit) {
        const id = this.carToEdit.id;
        const updates = updateCar(this.carToEdit, {
          name: this.state.carName.value,
          mpg: this.state.mpg.value
        });
        patchCarEffect(id, updates)
          .then(() => this.props.history.push('/'));
      }
    }
  }

  render() {
    return (
      <div>
        <EditCarFormComponent
          form={this.state}
          changeCarName={(e) => this.onChangeCarName(e)}
          changeMpg={(e) => this.onChangeMpg(e)}
          submit={(e) => this.onSubmit()}
        />
      </div>
    );
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscriber);
  }
}

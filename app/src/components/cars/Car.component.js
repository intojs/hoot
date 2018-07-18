// @flow
import React from 'react';
import {Card, CardText, CardBody, CardTitle, Button} from "reactstrap";

import type {Car} from "../../domain/Car";

type Props = {
  car: Car;
  edit: Function;
}

export const CarComponent = ({car, edit}: Props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{car.name}</CardTitle>
        <CardText>Year: {car.year}</CardText>
        <CardText>Horsepower: {car.horsepower}</CardText>
        <CardText>Acceleration: {car.acceleration}</CardText>
        <CardText>Weight: {car.weight}</CardText>
        <CardText>Mpg: {car.mpg}</CardText>
        <Button
          color="primary"
          onClick={edit}
        >
          Edit
        </Button>
      </CardBody>
    </Card>
  );
};

// @flow
import React from 'react';
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";

import type {EditCarForm} from "./EditCarForm";

type Props = {
  form: EditCarForm,
  changeCarName: Function,
  changeMpg: Function,
  submit: Function
}

const submit = (e: Event, cb) => {
  e.preventDefault();
  cb(e);
};

export const EditCarFormComponent = (props: Props) => {
  const {form} = props;
  const {carName, mpg} = form;

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={{size: 6, offset: 3}}>
          <Form
            noValidate
            onSubmit={(e) => submit(e, props.submit)}
          >
            <FormGroup>
              <Label htmlFor="car-name">Name</Label>
              <Input
                type="text"
                id="car-name"
                name="carName"
                autoComplete="off"
                value={carName.value}
                invalid={!carName.valid}
                onChange={(e) => props.changeCarName(e)}
              />
              {!carName.valid && (
                <FormFeedback>The care name is required and has to have at least three
                  characters</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="mpg">Mpg</Label>
              <Input
                type="text"
                id="mpg"
                name="mpg"
                autoComplete="off"
                value={mpg.value}
                invalid={!mpg.valid}
                onChange={(e) => props.changeMpg(e)}
              />
              {!mpg.valid && (
                <FormFeedback>The mpg needs to be less than 3000</FormFeedback>
              )}
            </FormGroup>
            <Button
              color="primary"
              type="submit"
              value="Submit"
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

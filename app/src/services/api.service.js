// @flow
import type {MetaCarsAggregate} from "../domain/MetaCarsAggregate";
import type {Car} from "../domain/Car";
import {getCarsApiUrl} from './environment.service';

export const getCars = (offset: number, limit: number): Promise<MetaCarsAggregate> =>
  fetch(`${getCarsApiUrl()}/?offset=${offset}&limit=${limit}&format=json`)
    .then((resp) => resp.json());

export const getCarById = (carId: number): Promise<Car> =>
  fetch(`${getCarsApiUrl()}/${carId}/`)
    .then((resp) => resp.json());

export const patchCar = (carId: number, updates: Car): Promise<Car> =>
  fetch(`${getCarsApiUrl()}/${carId}/`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(updates)
  })
    .then((resp) => resp.json());

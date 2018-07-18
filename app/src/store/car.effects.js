// @flow
import type {MetaCarsAggregate} from "../domain/MetaCarsAggregate";
import type {Car} from "../domain/Car";
import {createGetCarByIdError, createGetCarsError, createPatchCarError} from "../domain/AppError.service";
import {getCarById, getCars, patchCar} from "../services/api.service";
import {store} from "./store";

export const getCarsEffect = (offset: number, limit: number) => {
  store.setLoading(true);
  getCars(offset, limit)
    .then((aggregate: MetaCarsAggregate) => {
      store.setMeta(aggregate.meta);
      store.setCars(aggregate.objects);
      store.setLoading(false);
    })
    .catch(() => {
      store.setError(createGetCarsError());
      store.setLoading(false);
    });
};

export const getCarByIdEffect = (carId: number) => {
  store.setLoading(true);
  getCarById(carId)
    .then((car: Car) => {
      store.setCarToEdit(car);
      store.setLoading(false);
    })
    .catch(() => {
      store.setError(createGetCarByIdError(carId));
      store.setLoading(false);
    });
};

export const patchCarEffect = (carId: number, updates: Car): Promise<Car> => {
  store.setLoading(true);
  return patchCar(carId, updates)
    .then((car: Car) => {
      store.setLoading(false);
      return car;
    })
    .catch((error) => {
      store.setError(createPatchCarError(carId));
      store.setLoading(false);
      return error;
    });
};

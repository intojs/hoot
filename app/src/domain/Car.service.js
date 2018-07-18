// @flow
import type {Car} from "./Car";

export const getCarId = (car: Car): number => car.id;

export const isCarNameValid = (carName: any): boolean => typeof carName === 'string' && carName.length > 2;

export const isMpgValid = (mpg: any): boolean => typeof mpg === 'number' && mpg < 3000;

export const formatMpg = (mpg: any): ?number => {
  const parsed = parseInt(mpg, 10);
  return !isNaN(parsed) ? parsed : undefined;
};

export const updateCar = (car: Car, updates: any): Car => ({
  ...car,
  ...updates
});

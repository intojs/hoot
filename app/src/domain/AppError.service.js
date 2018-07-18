// @flow
export const createGetCarsError = (): Error =>
  Error('Could not retrieve the cars from the server');

export const createGetCarByIdError = (carId: number): Error =>
  Error(`Could not retrive the car with the id of ${carId} from the server`);

export const createPatchCarError = (carId: number): Error =>
  Error(`Could not patch the car with the id of ${carId}`);

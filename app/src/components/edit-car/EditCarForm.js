// @flow
export type CarNameFormField = {
  value: string,
  valid: boolean
};

export type MpgFormField = {
  value: number,
  valid: boolean
};

export type EditCarForm = {
  carName: CarNameFormField,
  mpg: MpgFormField
};

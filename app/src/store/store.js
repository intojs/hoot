// @flow
import type {AppState} from "../domain/AppState";
import type {Meta} from "../domain/meta/Meta";
import type {Car} from "../domain/Car";
import {getInitialState} from "./initial-state";

export const setMeta = (state: AppState, meta: Meta): AppState => ({
  ...state,
  meta
});

export const setCars = (state: AppState, cars: Car[]): AppState => ({
  ...state,
  cars
});

export const setLoading = (state: AppState, loading: boolean): AppState => ({
  ...state,
  loading
});

export const setError = (state: AppState, error: Error): AppState => ({
  ...state,
  error
});

export const setCarToEdit = (state: AppState, carToEdit: Car): AppState => ({
  ...state,
  carToEdit
});

export const subscribe = (subscribers: Function[], subscriber: Function): Function[] =>
  subscribers.concat(subscriber);

export const unsubscribe = (subscribers: Function[], subscriber: Function): Function[] =>
  subscribers.filter((s: Function) => s !== subscriber);

export const notify = (state: AppState, subscribers: Function[]) =>
  subscribers.forEach((s: Function) => s(state));

export const createStore = (initialState: AppState) => {
  let state: AppState = Object.freeze(initialState);
  let subscribers: Function[] = Object.freeze([]);

  return {
    getState: (): AppState => state,
    setMeta: (meta: Meta) => {
      state = setMeta(state, meta);
      notify(state, subscribers);
    },
    setCars: (cars: Car[]) => {
      state = setCars(state, cars);
      notify(state, subscribers);
    },
    setLoading: (loading: boolean) => {
      state = setLoading(state, loading);
      notify(state, subscribers);
    },
    setError: (error: Error) => {
      state = setError(state, error);
      notify(state, subscribers);
    },
    setCarToEdit: (car: Car) => {
      state = setCarToEdit(state, car);
      notify(state, subscribers);
    },
    subscribe: (subscriber: Function) => {
      subscribers = subscribe(subscribers, subscriber);
      return subscriber;
    },
    unsubscribe: (subscriber: Function) => {
      subscribers = unsubscribe(subscribers, subscriber);
    }
  }
};

export const store = createStore(getInitialState());

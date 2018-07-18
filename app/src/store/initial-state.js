// @flow
import type {AppState} from "../domain/AppState";

export const getInitialState = (): AppState => ({
  meta: {
    limit: 20,
    offset: 0
  },
  cars: [],
  loading: false
});

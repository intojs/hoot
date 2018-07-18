// @flow
import type {Meta} from "./meta/Meta";
import type {Car} from "./Car";

export type AppState = {
  +meta: Meta;
  +cars: Car[];
  +loading: boolean;
  +error?: Error;
  +carToEdit?: Car;
}

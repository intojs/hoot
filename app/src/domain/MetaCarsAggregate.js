// @flow
import type {Meta} from "./meta/Meta";
import type {Car} from "./Car";

export type MetaCarsAggregate = {
  +meta: Meta;
  +objects: Car[];
}

// @flow
import type {Meta} from "./Meta";
import type {Car} from "./Car";

export type MetaCarsAggregate = {
  +meta: Meta;
  +objects: Car[];
}

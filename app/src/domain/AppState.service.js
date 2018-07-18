// @flow
import type {AppState} from "./AppState";
import type {Meta} from "./Meta";

export const getMeta = (state: AppState): Meta => state.meta;

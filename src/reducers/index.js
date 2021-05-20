import { combineReducers } from "redux";
import articls from "./articls";
import articleView from "./articleView";
export const reducer = combineReducers({ articls, articleView });

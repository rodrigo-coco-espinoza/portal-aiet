import { combineReducers } from "redux";
import { queries } from "./queries";
import { auth } from './auth'
import { institucion_reducer } from "./pc_isla";

export default combineReducers({
    queries,
    auth,
    institucion_reducer
})  
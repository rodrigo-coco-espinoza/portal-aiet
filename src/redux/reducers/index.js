import { combineReducers } from "redux";
import { queries } from "./queries";
import { auth } from './auth'

export default combineReducers({
    queries,
    auth
})  
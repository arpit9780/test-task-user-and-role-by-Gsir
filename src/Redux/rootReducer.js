import { combineReducers } from "redux";
import RoleReducer from './Slices/RoleSlice'
import UserReducer from './Slices/UserSlice'
const rootReducer = combineReducers({
      RoleReducer,
      UserReducer
})

export default rootReducer;
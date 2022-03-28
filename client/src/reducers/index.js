import { combineReducers } from "redux";
import votesReducer from "./votesReducer";
import authorizationReducer from "./authorizatonReducer";

const rootReducer = combineReducers({
  votes: votesReducer,
  authorization: authorizationReducer,
});

export default rootReducer;

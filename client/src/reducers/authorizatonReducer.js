import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actions/action-types";

const initialState = {
  loggedIn: false,
  currentUser: {},
};

export default function authorizationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        loggedIn: true,
        currentUser: action.payload,
      };
    case NOT_AUTHENTICATED:
      return {
        loggedIn: false,
        currentUser: {},
      };
    default:
      return state;
  }
}

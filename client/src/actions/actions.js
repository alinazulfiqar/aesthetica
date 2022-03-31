import * as actionTypes from "./action-types";

export const AUTHENTICATED = (userID) => {
  return {
    type: actionTypes.AUTHENTICATED,
    payload: {
      user: userID,
    },
  };
};

export const NOT_AUTHENTICATED = () => {
  return {
    type: actionTypes.NOT_AUTHENTICATED,
  };
};

export const VOTE = (contentID, u_id, value) => {
  return {
    type: actionTypes.UPVOTE,
    payload: {
      id: contentID,
      user_id: u_id,
      value: value,
    },
  };
};

export const DOWNVOTE = (contentID, u_id) => {
  return {
    type: actionTypes.DOWNVOTE,
    payload: {
      id: contentID,
      user_id: u_id,
    },
  };
};

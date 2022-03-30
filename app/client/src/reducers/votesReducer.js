import { VOTE, DOWNVOTE } from "../actions/action-types";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const initialState = {
  votes: [],
};

export default function votesReducer(state = initialState, action) {
  switch (action.type) {
    case VOTE:
      // const alreadyUpvoted = state.votes.find(
      //   (item) =>
      //     item.id === action.payload.id && item.value === action.payload.value
      // );
      return {
        ...state,
        votes: [...state.votes, action.payload],

        // state = [{content_id: action.payload.id, upvotes:}]
        //  2:40am plan is to update count of upvotes and downvotes, they should not be a string so change that pls
      };
    case DOWNVOTE:
      return {
        state,
      };

    default:
      return state;
  }
}

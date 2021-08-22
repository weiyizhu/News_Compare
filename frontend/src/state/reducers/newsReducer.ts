import {
  NewsAction,
  NewsActionPayload,
  NewsActionType,
} from "../action-types/newsActionTypes";

const initialState: NewsActionPayload = {
  posts: undefined,
};

const newsReducer = (
  state: NewsActionPayload = initialState,
  action: NewsAction
) => {
  switch (action.type) {
    case NewsActionType.UPDATE_NEWS:
      return action.payload;
    default:
      return state;
  }
};

export default newsReducer;

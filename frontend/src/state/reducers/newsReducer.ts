import {
  NewsAction,
  NewsActionPayload,
  NewsActionType,
  NewsStatus,
} from "../action-types/newsActionTypes";

const initialState: NewsActionPayload = {
  posts: null,
  status: NewsStatus.IDLE,
  errorMsg: null,
};

const newsReducer = (
  state: NewsActionPayload = initialState,
  action: NewsAction
) => {
  switch (action.type) {
    case NewsActionType.FETCH_NEWS:
      return action.payload;
    case NewsActionType.UPDATE_NEWS:
      return { ...state, status: NewsStatus.IDLE, posts: action.payload };
    case NewsActionType.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload.status,
        errorMsg: action.payload.errorMsg,
      };
    default:
      return state;
  }
};

export default newsReducer;

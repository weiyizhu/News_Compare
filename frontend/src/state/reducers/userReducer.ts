import {
  UserActionPayload,
  UserAction,
  UserActionType,
  UserTabVal,
} from "../action-types/userActionTypes";

const initialState: UserActionPayload = {
  isLoggedIn: false,
  tabVal: UserTabVal.ACCOUNT,
  email: "",
};

const userReducer = (
  state: UserActionPayload = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionType.UPDATE_USER_INFO:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        email: action.payload.email,
      };
    case UserActionType.TOGGLE_USER_TAB_VAL:
      return {
        ...state,
        tabVal: action.payload,
      };
    case UserActionType.UPDATE_SAVED_SEARCHES:
      return {
        ...state,
        savedSearches: action.payload
      }
    case UserActionType.UPDATE_SAVED_NEWS:
      return {
        ...state,
        savedNews: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;

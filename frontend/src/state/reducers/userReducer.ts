import {
  UserActionPayload,
  UserAction,
  UserActionType,
  UserTabVal,
} from "../action-types/userActionTypes";

const initialState: UserActionPayload = {
  loggedIn: false,
  tabVal: UserTabVal.ACCOUNT,
};

const userReducer = (
  state: UserActionPayload = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionType.UPDATE_LOGGED_IN_STATUS:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case UserActionType.TOGGLE_USER_TAB_VAL:
      return {
        ...state,
        tabVal: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

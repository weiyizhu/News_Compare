import { UserActionPayload, UserAction, UserActionType } from "../action-types/userActionTypes";


const initialState: UserActionPayload = {
  loggedIn: false
};

const userReducer = (
  state: UserActionPayload = initialState,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionType.UPDATE_LOGGED_IN_STATUS:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;

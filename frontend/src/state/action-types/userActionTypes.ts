export enum UserActionType {
  UPDATE_LOGGED_IN_STATUS = "UPDATE_LOGGED_IN_STATUS",
  TOGGLE_USER_TAB_VAL = "TOGGLE_USER_TAB_VAL"
}

export type UserActionPayload = {
  loggedIn: boolean;
  tabVal: UserTabVal
};

export enum UserTabVal {
  "ACCOUNT" = 0,
  "SAVEDSEARCHES" = 2,
  "SAVEDNEWS" = 4
}

type UpdateLoggedInStatusAction = {
  type: UserActionType.UPDATE_LOGGED_IN_STATUS;
  payload: boolean
};

type ToggleUserTabValAction = {
  type: UserActionType.TOGGLE_USER_TAB_VAL;
  payload: UserTabVal;
};

export type UserAction = UpdateLoggedInStatusAction | ToggleUserTabValAction;

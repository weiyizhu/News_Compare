export enum UserActionType {
  TOGGLE_USER_TAB_VAL = "TOGGLE_USER_TAB_VAL",
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
}

export type UserActionPayload = {
  isLoggedIn: boolean;
  tabVal: UserTabVal;
  email: string;
};

export enum UserTabVal {
  "ACCOUNT" = 0,
  "SAVEDSEARCHES" = 2,
  "SAVEDNEWS" = 4,
}

type ToggleUserTabValAction = {
  type: UserActionType.TOGGLE_USER_TAB_VAL;
  payload: UserTabVal;
};

type UpdateUserInfoAction = {
  type: UserActionType.UPDATE_USER_INFO;
  payload: {
    isLoggedIn: boolean;
    email: string;
  };
};

export type UserAction = ToggleUserTabValAction | UpdateUserInfoAction;

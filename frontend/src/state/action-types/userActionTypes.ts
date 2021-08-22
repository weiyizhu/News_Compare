export enum UserActionType {
  UPDATE_LOGGED_IN_STATUS = "UPDATE_LOGGED_IN_STATUS",
}

export type UserActionPayload = {
  loggedIn: boolean
};

type UpdateLoggedInStatusAction = {
  type: UserActionType.UPDATE_LOGGED_IN_STATUS;
  payload: boolean
};

export type UserAction = UpdateLoggedInStatusAction

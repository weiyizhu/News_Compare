export enum UserActionType {
  TOGGLE_USER_TAB_VAL = "TOGGLE_USER_TAB_VAL",
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
  UPDATE_SAVED_SEARCHES = "UPDATE_SAVED_SEARCHES",
  UPDATE_SAVED_NEWS = "UPDATE_SAVED_NEWS",
}

export interface savedNews {
  title: string;
  date: string;
  imgUrl: string;
  newsUrl: string;
}

export interface savedSearches {
  keywords: string;
  sources: string[];
}

export type UserActionPayload = {
  isLoggedIn: boolean;
  tabVal: UserTabVal;
  email: string;
  savedSearches?: savedSearches[];
  savedNews?: savedNews[];
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

type UpdateSavedSearchesAction = {
  type: UserActionType.UPDATE_SAVED_SEARCHES;
  payload: savedSearches[] | undefined;
};

type UpdateSavedNewsAction = {
  type: UserActionType.UPDATE_SAVED_NEWS;
  payload: savedNews[] | undefined;
};

export type UserAction =
  | ToggleUserTabValAction
  | UpdateUserInfoAction
  | UpdateSavedSearchesAction
  | UpdateSavedNewsAction;

export enum NewsActionType {
  FETCH_NEWS = "FETCH_NEWS",
  UPDATE_NEWS = "UPDATE_NEWS",
  UPDATE_STATUS = "UPDATE_STATUS",
}

export enum NewsStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type NewsActionPayload = {
  posts?: NewsResponseProps[] | null;
  status: NewsStatus;
  errorMsg?: string | null;
};

export type FetchNewsAction = {
  type: NewsActionType.FETCH_NEWS;
  payload: NewsActionPayload;
};

export type UpdateNewsAction = {
  type: NewsActionType.UPDATE_NEWS;
  payload: NewsResponseProps[] | undefined | null;
};

export type UpdateErrorAction = {
  type: NewsActionType.UPDATE_STATUS;
  payload: {
    status: NewsStatus;
    errorMsg?: string | null;
  };
};

export type NewsAction = FetchNewsAction | UpdateNewsAction | UpdateErrorAction;

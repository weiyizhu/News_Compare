export enum StatusActionType {
  UPDATE_STATUS = "UPDATE_STATUS",
}

export enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type StatusActionPayload = {
  status: Status;
  msg?: string | null;
};

export type StatusAction = {
  type: StatusActionType.UPDATE_STATUS;
  payload: {
    status: Status;
    msg?: string | null;
  };
};

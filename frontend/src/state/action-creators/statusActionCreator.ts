import { Dispatch } from "redux";
import {
  Status,
  StatusAction,
  StatusActionType,
} from "../action-types/statusActionTypes";

export const updateStatus = (status: Status, msg?: string | null) => {
  return (dispatch: Dispatch<StatusAction>) => {
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status,
        msg,
      },
    });
  };
};

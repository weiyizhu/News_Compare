import { Status, StatusAction, StatusActionPayload, StatusActionType } from "../action-types/statusActionTypes";

const initialState: StatusActionPayload = {
  status: Status.IDLE,
  msg: null,
};

const statusReducer = (
  state: StatusActionPayload = initialState,
  action: StatusAction
) => {
  switch (action.type) {
    case StatusActionType.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload.status,
        msg: action.payload.msg,
      };
    default:
      return state;
  }
};

export default statusReducer;

import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { actionCreators } from "..";
import {
  Status,
  StatusAction,
  StatusActionType,
} from "../action-types/statusActionTypes";
import { UserAction, UserActionType } from "../action-types/userActionTypes";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

interface LoginStatus {
  isLoggedIn: boolean;
}

export const checkLoggedInStatus = () => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .get<Promise<LoginStatus>>(url + "/users/checkLoggedInStatus", {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        dispatch({
          type: StatusActionType.UPDATE_STATUS,
          payload: {
            status: Status.ERROR,
            msg: err.message,
          },
        });
        return;
      });
    const data = res && (await res.data);
    const isLoggedIn = data ? data.isLoggedIn : false;

    dispatch({
      type: UserActionType.UPDATE_LOGGED_IN_STATUS,
      payload: isLoggedIn,
    });
  };
};

export const login = (email: string, password: string, remembered: boolean) => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .post<Promise<LoginStatus>>(
        url + "/users/login",
        {
          email,
          password,
          remembered,
        },
        { withCredentials: true }
      )
      .catch((err: AxiosError) => {
        console.log(err.message);
        const errorMsg: string | undefined = err.response?.data.msg;
        dispatch({
          type: StatusActionType.UPDATE_STATUS,
          payload: {
            status: Status.ERROR,
            msg: errorMsg ?? err.message,
          },
        });
      });

    if (res) {
      dispatch({
        type: UserActionType.UPDATE_LOGGED_IN_STATUS,
        payload: true,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    console.log('object')
    const res = await axios
      .get(url + "/users/logout", {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });

    dispatch({
      type: UserActionType.UPDATE_LOGGED_IN_STATUS,
      payload: false,
    });
  };
};

import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import {
  Status,
  StatusAction,
  StatusActionType,
} from "../action-types/statusActionTypes";
import {
  UserAction,
  UserActionType,
  UserTabVal,
  savedNews,
  savedSearches,
} from "../action-types/userActionTypes";

interface LoginStatus {
  isLoggedIn: boolean;
  email: string;
}

export const initialize = () => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .get<Promise<LoginStatus>>("/users/checkLoggedInStatus", {
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
    const email = data ? data.email : "";

    dispatch({
      type: UserActionType.UPDATE_USER_INFO,
      payload: {
        isLoggedIn: isLoggedIn,
        email: email,
      },
    });
    if (isLoggedIn) {
      const searchRes = await axios
        .get("/users/savedSearches", { withCredentials: true })
        .catch((err) => {
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

      const searchData = searchRes && (await searchRes.data);
      const newSavedSearches = searchData
        ? searchData.savedSearches
        : undefined;
      dispatch({
        type: UserActionType.UPDATE_SAVED_SEARCHES,
        payload: newSavedSearches,
      });

      const newsRes = await axios
        .get("/users/savedNews", { withCredentials: true })
        .catch((err) => {
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

      const newsData = newsRes && (await newsRes.data);
      const newSavedNews = newsData ? newsData.savedSearches : undefined;
      dispatch({
        type: UserActionType.UPDATE_SAVED_NEWS,
        payload: newSavedNews,
      });
    }
  };
};

export const login = (email: string, password: string, remembered: boolean) => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .post<Promise<LoginStatus>>(
        "/users/login",
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
        type: UserActionType.UPDATE_USER_INFO,
        payload: {
          isLoggedIn: true,
          email: email,
        },
      });

      const searchRes = await axios
        .get("/users/savedSearches", { withCredentials: true })
        .catch((err) => {
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

      const searchData = searchRes && (await searchRes.data);
      const newSavedSearches = searchData
        ? searchData.savedSearches
        : undefined;
      dispatch({
        type: UserActionType.UPDATE_SAVED_SEARCHES,
        payload: newSavedSearches,
      });

      const newsRes = await axios
        .get("/users/savedNews", { withCredentials: true })
        .catch((err) => {
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

      const newsData = newsRes && (await newsRes.data);
      const newSavedNews = newsData ? newsData.savedSearches : undefined;
      dispatch({
        type: UserActionType.UPDATE_SAVED_NEWS,
        payload: newSavedNews,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    await axios
      .get("/users/logout", {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });

    dispatch({
      type: UserActionType.UPDATE_USER_INFO,
      payload: {
        isLoggedIn: false,
        email: "",
      },
    });
  };
};

export const toggleUserTabVal = (tabVal: UserTabVal) => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionType.TOGGLE_USER_TAB_VAL,
      payload: tabVal,
    });
  };
};

export const getSavedSearches = () => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .get("/users/savedSearches", { withCredentials: true })
      .catch((err) => {
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
    const newSavedSearches = data ? data.savedSearches : undefined;
    dispatch({
      type: UserActionType.UPDATE_SAVED_SEARCHES,
      payload: newSavedSearches,
    });
  };
};

export const addSavedSearches = (
  keywords: string,
  sources: string[],
  savedSearches: savedSearches[] | undefined
) => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .post(
        "/users/addSavedSearches",
        {
          keywords,
          sources,
        },
        { withCredentials: true }
      )
      .catch((err) => {
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
    const newSavedSearches = data ? data.savedSearches : savedSearches;
    dispatch({
      type: UserActionType.UPDATE_SAVED_SEARCHES,
      payload: newSavedSearches,
    });
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.SUCCESS,
        msg: "Search saved!",
      },
    });
  };
};

export const deleteSavedSearches = (
  keywords: string,
  sources: string[],
  savedSearches: savedSearches[] | undefined
) => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .post(
        "/users/deleteSavedSearches",
        {
          keywords,
          sources,
        },
        { withCredentials: true }
      )
      .catch((err) => {
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
    const newSavedSearches = data ? data.savedSearches : savedSearches;
    dispatch({
      type: UserActionType.UPDATE_SAVED_SEARCHES,
      payload: newSavedSearches,
    });
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.SUCCESS,
        msg: "Search deleted!",
      },
    });
  };
};

export const getSavedNews = () => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .get("/users/savedNews", { withCredentials: true })
      .catch((err) => {
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
    const newSavedNews = data ? data.savedSearches : undefined;
    dispatch({
      type: UserActionType.UPDATE_SAVED_NEWS,
      payload: newSavedNews,
    });
  };
};

export const addSavedNews = (
  title?: string,
  date?: string,
  imgUrl?: string,
  newsUrl?: string,
  savedNews?: savedNews[]
) => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .post(
        "/users/addSavedNews",
        {
          title,
          date,
          imgUrl,
          newsUrl,
        },
        { withCredentials: true }
      )
      .catch((err) => {
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
    const newSavedNews = data ? data.savedNews : savedNews;
    dispatch({
      type: UserActionType.UPDATE_SAVED_NEWS,
      payload: newSavedNews,
    });
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.SUCCESS,
        msg: "News saved!",
      },
    });
  };
};

export const deleteSavedNews = (
  title?: string,
  date?: string,
  imgUrl?: string,
  newsUrl?: string,
  savedNews?: savedNews[]
) => {
  return async (dispatch: Dispatch<UserAction | StatusAction>) => {
    const res = await axios
      .post(
        "/users/deleteSavedNews",
        {
          title,
          date,
          imgUrl,
          newsUrl,
        },
        { withCredentials: true }
      )
      .catch((err) => {
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
    const newSavedNews = data ? data.savedNews : savedNews;
    dispatch({
      type: UserActionType.UPDATE_SAVED_NEWS,
      payload: newSavedNews,
    });
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.SUCCESS,
        msg: "News deleted!",
      },
    });
  };
};

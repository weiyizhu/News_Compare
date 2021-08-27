import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import axios from "axios";
import { Dispatch } from "redux";
import { actionCreators } from "..";
import { NewsAction, NewsActionType } from "../action-types/newsActionTypes";
import { Filters } from "../action-types/searchActionTypes";
import {
  Status,
  StatusAction,
  StatusActionType,
} from "../action-types/statusActionTypes";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

export const isInvalidInput = (
  sourcesWithPage: sourceWithPage[],
  fromDate?: ParsableDate,
  toDate?: ParsableDate
) => {
  if (sourcesWithPage.length === 0) {
    return "Sources cannot be zero.";
  }
  if (sourcesWithPage.length > 3) {
    return "Sources cannot be more than three.";
  }
  if (
    fromDate &&
    toDate &&
    new Date(fromDate.toString()) > new Date(toDate.toString())
  ) {
    return "From Date cannot be after To Date";
  }
  return undefined;
};

export const getTopHeadlines =
  (keywords: string, sourcesWithPage: sourceWithPage[]) =>
  async (dispatch: Dispatch<StatusAction | NewsAction>) => {
    console.log("top headlines", keywords, sourcesWithPage);
    // check if input is valid
    const errorMsg = isInvalidInput(sourcesWithPage);
    if (errorMsg) {
      dispatch({
        type: StatusActionType.UPDATE_STATUS,
        payload: {
          status: Status.ERROR,
          msg: errorMsg,
        },
      });
      return;
    }

    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.LOADING,
      },
    });

    let newsResponseArr: NewsResponseProps[] = [];
    for (let sourceWithPage of sourcesWithPage) {
      const res = await axios
        .post<Promise<NewsResponseProps>>(url + "/news/top-headlines", {
          params: {
            q: keywords,
            sources: sourceWithPage["source"],
            page: sourceWithPage["page"],
            pageSize: 3,
          },
        })
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
      console.log("data from api call", data);
      data && newsResponseArr.push(data);
    }
    dispatch({
      type: NewsActionType.UPDATE_NEWS,
      payload: newsResponseArr,
    });
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.IDLE,
      },
    });
  };

export const getEverything =
  (
    keywords: string,
    fromDate: string,
    toDate: string,
    sourcesWithPage: sourceWithPage[],
    filter: Filters
  ) =>
  async (dispatch: Dispatch<NewsAction | StatusAction>) => {
    // check if input is valid
    const errorMsg = isInvalidInput(sourcesWithPage, fromDate, toDate);
    if (errorMsg) {
      dispatch({
        type: StatusActionType.UPDATE_STATUS,
        payload: {
          status: Status.ERROR,
          msg: errorMsg,
        },
      });
      return;
    }

    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.LOADING,
      },
    });

    let newsResponseArr: NewsResponseProps[] = [];
    for (let sourceWithPage of sourcesWithPage) {
      const res = await axios
        .post<Promise<NewsResponseProps>>(url + "/news/everything", {
          params: {
            q: keywords,
            from: fromDate,
            to: toDate,
            sources: sourceWithPage["source"],
            page: sourceWithPage["page"],
            pageSize: 3,
            sortBy: filter.toString(),
            language: "en",
          },
        })
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
      console.log(data);
      data && newsResponseArr.push(data);
    }
    dispatch({
      type: NewsActionType.UPDATE_NEWS,
      payload: newsResponseArr,
    });
    dispatch({
      type: StatusActionType.UPDATE_STATUS,
      payload: {
        status: Status.IDLE,
      },
    });
  };

export const updateNews = (news: NewsResponseProps[] | undefined | null) => {
  return (dispatch: Dispatch<NewsAction>) => {
    dispatch({
      type: NewsActionType.UPDATE_NEWS,
      payload: news,
    });
  };
};

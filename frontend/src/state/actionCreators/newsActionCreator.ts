import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import axios from "axios";
import { Dispatch } from "redux";
import {
  Filters,
  NewsAction,
  NewsActionType,
  NewsStatus,
} from "../ActionTypes";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

const isInvalidInput = (
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
  async (dispatch: Dispatch<NewsAction>) => {
    console.log("top headlines", keywords, sourcesWithPage);
    // check if input is valid
    const errorMsg = isInvalidInput(sourcesWithPage);
    if (errorMsg) {
      dispatch({
        type: NewsActionType.UPDATE_STATUS,
        payload: {
          status: NewsStatus.ERROR,
          errorMsg: errorMsg,
        },
      });
      return;
    }

    dispatch({
      type: NewsActionType.UPDATE_STATUS,
      payload: {
        status: NewsStatus.LOADING,
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
            type: NewsActionType.UPDATE_STATUS,
            payload: {
              status: NewsStatus.ERROR,
              errorMsg: err.message,
            },
          });
          return;
        });

      const data = res && (await res.data);
      console.log("data from api call", data);
      data && newsResponseArr.push(data);
    }
    dispatch({
      type: NewsActionType.FETCH_NEWS,
      payload: {
        posts: newsResponseArr,
        status: NewsStatus.SUCCESS,
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
  async (dispatch: Dispatch<NewsAction>) => {
    // check if input is valid
    const errorMsg = isInvalidInput(sourcesWithPage, fromDate, toDate);
    if (errorMsg) {
      dispatch({
        type: NewsActionType.UPDATE_STATUS,
        payload: {
          status: NewsStatus.ERROR,
          errorMsg: errorMsg,
        },
      });
      return;
    }

    dispatch({
      type: NewsActionType.UPDATE_STATUS,
      payload: {
        status: NewsStatus.LOADING,
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
            type: NewsActionType.UPDATE_STATUS,
            payload: {
              status: NewsStatus.ERROR,
              errorMsg: err.message,
            },
          });
          return;
        });
      const data = res && (await res.data);
      console.log(data);
      data && newsResponseArr.push(data);
    }
    dispatch({
      type: NewsActionType.FETCH_NEWS,
      payload: {
        posts: newsResponseArr,
        status: NewsStatus.SUCCESS,
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

export const updateStatus = (status: NewsStatus, errorMsg?: string | null) => {
  return (dispatch: Dispatch<NewsAction>) => {
    dispatch({
      type: NewsActionType.UPDATE_STATUS,
      payload: {
        status: status,
        errorMsg: errorMsg,
      },
    });
  };
};

import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import axios, { AxiosError } from "axios";
import moment from "moment";
import { Dispatch } from "redux";
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
  if (fromDate && toDate) {
    if (new Date(fromDate.toString()) > new Date(toDate.toString())) {
      return "From Date cannot be after To Date";
    } else if (
      moment().subtract(1, "month").diff(moment(fromDate), "day") > 0
    ) {
      return "The minimum date is one month earlier";
    }
  }

  return undefined;
};

export const getTopHeadlines =
  (keywords: string, sourcesWithPage: sourceWithPage[]) =>
  async (dispatch: Dispatch<StatusAction | NewsAction>) => {
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
    let error: string | undefined = undefined;
    for (let sourceWithPage of sourcesWithPage) {
      const res = await axios
        .post<Promise<NewsResponseProps>>("/news/top-headlines", {
          params: {
            q: keywords,
            sources: sourceWithPage["source"],
            page: sourceWithPage["page"],
            pageSize: 3,
          },
        })
        .catch((err: AxiosError) => {
          console.log(err.message, err.response?.status);
          error = err.message;
          if (err.response?.status === 429) {
            error = "Daily search limit reached. Please try again tomorrow.";
          }
          dispatch({
            type: StatusActionType.UPDATE_STATUS,
            payload: {
              status: Status.ERROR,
              msg: error,
            },
          });
          return;
        });

      const data = res && (await res.data);
      data && newsResponseArr.push(data);
    }
    dispatch({
      type: NewsActionType.UPDATE_NEWS,
      payload: newsResponseArr,
    });
    if (!error)
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
    let error: string | undefined = undefined;
    for (let sourceWithPage of sourcesWithPage) {
      const res = await axios
        .post<Promise<NewsResponseProps>>("/news/everything", {
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
        .catch((err: AxiosError) => {
          console.log(err.message);
          error = err.message;
          if (err.response?.status === 429) {
            error = "Daily search limit reached. Please try again tomorrow.";
          }
          dispatch({
            type: StatusActionType.UPDATE_STATUS,
            payload: {
              status: Status.ERROR,
              msg: error,
            },
          });
          return;
        });
      const data = res && (await res.data);
      data && newsResponseArr.push(data);
    }
    dispatch({
      type: NewsActionType.UPDATE_NEWS,
      payload: newsResponseArr,
    });
    if (!error)
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

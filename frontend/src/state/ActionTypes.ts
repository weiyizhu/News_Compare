import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

export enum NewsActionType {
  FETCH_NEWS = "FETCH_NEWS",
  UPDATE_NEWS = "UPDATE_NEWS",
  UPDATE_STATUS = "UPDATE_STATUS",
}

export enum NewsStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export type NewsActionPayload = {
  posts?: NewsResponseProps[] | null;
  status: NewsStatus
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

export enum SearchActionType {
  TOGGLE_TAB_VAL = "TOGGLE_TAB_VAL",
  UPDATE_KEYWORDS = "UPDATE_KEYWORDS",
  UPDATE_FROM_DATE = "UPDATE_FROM_DATE",
  UPDATE_TO_DATE = "UPDATE_TO_DATE",
  UPDATE_SOURCES_WITH_PAGE = "UPDATE_SOURCES_WITH_PAGE",
  TOGGLE_OPEN_MENU = "TOGGLE_OPEN_MENU",
  UPDATE_FILTER = "UPDATE_FILTER",
}

export enum Filters {
  publishedAt = "publishedAt",
  relavency = "relavency",
  popularity = "popularity",
}

export type SearchActionPayload = {
  tabVal: number;
  keywords: string;
  fromDate: ParsableDate;
  toDate: ParsableDate;
  sourcesWithPage: sourceWithPage[];
  openMenu: boolean;
  filter: Filters;
};

interface TabValAction {
  type: SearchActionType.TOGGLE_TAB_VAL;
  payload: number;
}
interface KeywordsAction {
  type: SearchActionType.UPDATE_KEYWORDS;
  payload: string;
}
interface FromDateAction {
  type: SearchActionType.UPDATE_FROM_DATE;
  payload: ParsableDate;
}
interface ToDateAction {
  type: SearchActionType.UPDATE_TO_DATE;
  payload: ParsableDate;
}
interface SourcesWithPageAction {
  type: SearchActionType.UPDATE_SOURCES_WITH_PAGE;
  payload: sourceWithPage[];
}
interface OpenMenuAction {
  type: SearchActionType.TOGGLE_OPEN_MENU;
  payload: boolean;
}
interface FilterAction {
  type: SearchActionType.UPDATE_FILTER;
  payload: Filters;
}

export type SearchAction =
  | TabValAction
  | KeywordsAction
  | FromDateAction
  | ToDateAction
  | SourcesWithPageAction
  | OpenMenuAction
  | FilterAction;

import { Reducer } from "redux";
import {
  Filters,
  SearchAction,
  SearchActionPayload,
  SearchActionType,
} from "../action-types/searchActionTypes";

const initialState: SearchActionPayload = {
  tabVal: 0,
  keywords: "",
  fromDate: new Date(),
  toDate: new Date(),
  sourcesWithPage: [
    { source: "cnn", page: 1 },
    { source: "the-wall-street-journal", page: 1 },
    { source: "fox-news", page: 1 },
  ],
  openMenu: false,
  filter: Filters.publishedAt,
};

export const searchReducer: Reducer<SearchActionPayload, SearchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SearchActionType.TOGGLE_TAB_VAL:
      return { ...state, tabVal: action.payload };
    case SearchActionType.UPDATE_KEYWORDS:
      return { ...state, keywords: action.payload };
    case SearchActionType.UPDATE_FROM_DATE:
      return { ...state, fromDate: action.payload };
    case SearchActionType.UPDATE_TO_DATE:
      return { ...state, toDate: action.payload };
    case SearchActionType.UPDATE_SOURCES_WITH_PAGE:
      return { ...state, sourcesWithPage: action.payload };
    case SearchActionType.TOGGLE_OPEN_MENU:
      return { ...state, openMenu: action.payload };
    case SearchActionType.UPDATE_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

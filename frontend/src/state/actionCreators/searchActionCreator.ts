import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { Dispatch } from "react";
import { Filters, SearchAction, SearchActionType } from "../ActionTypes";

export const toggleTabVal = (tabVal: number) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.TOGGLE_TAB_VAL,
      payload: tabVal,
    });
  };
};

export const updateKeywords = (keywords: string) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.UPDATE_KEYWORDS,
      payload: keywords
    })
  }
}
export const updateFromDate = (fromDate: ParsableDate) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.UPDATE_FROM_DATE,
      payload: fromDate
    })
  }
}
export const updateToDate = (toDate: ParsableDate) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.UPDATE_TO_DATE,
      payload: toDate
    })
  }
}
export const updateSourcesWithPage = (sourcesWithPage: sourceWithPage[]) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.UPDATE_SOURCES_WITH_PAGE,
      payload: sourcesWithPage
    })
  }
}
export const toggleOpenMenu = (openMenu: boolean) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.TOGGLE_OPEN_MENU,
      payload: openMenu
    })
  }
}
export const updateFilter = (filter: Filters) => {
  return (dispatch: Dispatch<SearchAction>) => {
    dispatch({
      type: SearchActionType.UPDATE_FILTER,
      payload: filter
    })
  }
}



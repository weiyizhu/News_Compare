import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import { searchReducer } from "./searchReducer";

const reducers = combineReducers({
  news: newsReducer,
  searchProps: searchReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

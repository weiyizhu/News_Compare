import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import { searchReducer } from "./searchReducer";
import statusReducer from "./statusReducer";

const reducers = combineReducers({
  news: newsReducer,
  searchProps: searchReducer,
  status: statusReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

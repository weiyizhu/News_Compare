import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import { searchReducer } from "./searchReducer";
import statusReducer from "./statusReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  news: newsReducer,
  searchProps: searchReducer,
  status: statusReducer,
  user: userReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

import { combineReducers } from "@reduxjs/toolkit";
import slackSlice from "../redux/slackRedux";

const rootReducer = combineReducers({
  slackReducer: slackSlice,
});

export default rootReducer;

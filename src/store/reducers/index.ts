import { combineReducers } from "redux";
import { RecipeReducer } from "./post";
import { EditedReducer } from "./edited";
// import { PayloadAction } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  recipes: RecipeReducer,
  edited: EditedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;


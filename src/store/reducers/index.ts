import { combineReducers } from 'redux'; 
import { RecipeReducer } from './post'
import { EditedReducer } from './edited';
import { PayloadAction } from "@reduxjs/toolkit";

const appReducer = combineReducers({
    recipes : RecipeReducer,
    edited: EditedReducer,
})

export const rootReducer = (state: any, action: PayloadAction<any>) => {
    switch(action.type) {
        default:
            return appReducer(state, action)
    }
}



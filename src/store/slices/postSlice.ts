import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../reducers/post";

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: [] as Recipe[]
  },
  reducers: {
    setPost(state, action: PayloadAction<Recipe[]>) {
      state.post = action.payload;
    },
  },
});


export const { setPost } = postSlice.actions;
export default postSlice.reducer;
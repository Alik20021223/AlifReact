// postSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "../reducers/post";
import axios from "axios";

const API_URL = "https://65cf1e2ebdb50d5e5f5a8591.mockapi.io/api/blog/recept";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [] as Recipe[],
  },
  reducers: {
    setPost(state, action: PayloadAction<Recipe[]>) {
      state.post = action.payload;
    },
    removePost(state, action: PayloadAction<number>) {
      const postIdToRemove = action.payload;
      axios.delete(`${API_URL}/${postIdToRemove}`)
        .then(() => {
          state.post = state.post.filter((recipe) => recipe.id !== postIdToRemove);
        })
        .catch((error) => {
          console.error("Error removing post on the backend:", error);
        });
    },
    updatePost(state, action: PayloadAction<Recipe>) {
      const updatedPost = action.payload;
      axios.put(`${API_URL}/${updatedPost.id}`, updatedPost)
        .then(() => {
          state.post = state.post.map((recipe) =>
            recipe.id === updatedPost.id ? updatedPost : recipe
          );
        })
        .catch((error) => {
          console.error("Error updating post on the backend:", error);
        });
    },
    addPost(state, action: PayloadAction<Recipe>) {
      const newPost = action.payload;
      axios.post(API_URL, newPost)
        .then(() => {
          state.post = [...state.post, newPost];
        })
        .catch((error) => {
          console.error("Error adding post on the backend:", error);
        });
    },
  },
});

export const { setPost, addPost, removePost, updatePost } = postSlice.actions;
export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoading: true,
  isLoading: false,
  error: null,
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    initializePosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    removeOnePost: (state, action) => {
      const filteredPosts = state.posts.filter((post) => {
        return post._id !== action.payload._id;
      });
      state.posts = filteredPosts;
    },
  },
});
export const {initializePosts, addPost, removeOnePost} = postsSlice.actions;
export default postsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import postsReducer from '../features/Posts/PostsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer
  }
})
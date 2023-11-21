import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  listOfPosts: [],
  postTitle: 'John',
  postBody: 'Hello World',
  isLoading: false,
  isSending: false
}

export const fetchPosts = createAsyncThunk('getPosts', async () => {
  const response = await axios.get(url)
  return response.data
})

export const addPosts = createAsyncThunk('addPosts', async (obj) => {
  const response = await axios.post(url, {
    id: Math.random(),
    userId: 1,
    title: obj.title,
    body: obj.body
  })
  return response.data
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.postTitle = action.payload
    },
    updateBody: (state, action) => {
      state.postBody = action.payload
    },
    // addPost: (state) => {
    //   state.listOfPosts.push({
    //     title: state.postTitle,
    //     body: state.postBody
    //   })
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log('received data!')
        state.listOfPosts = action.payload
        state.isLoading = false
      })
      .addCase(fetchPosts.pending, (state) => {
        console.log('fetching data...')
        state.isLoading = true
      })
      .addCase(fetchPosts.rejected, (error) => {
        console.log('Error:', error)
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        console.log('post added!')
        state.listOfPosts.unshift(action.payload)
        state.isSending = false
      })
      .addCase(addPosts.pending, (state) => {
        console.log('sending data...')
        state.isSending = true
      })
      .addCase(addPosts.rejected, (state, error) => {
        console.log('sending failed!', error)
        state.isSending = false
      })
  }
})

export const { updateTitle, updateBody } = postsSlice.actions

export default postsSlice.reducer
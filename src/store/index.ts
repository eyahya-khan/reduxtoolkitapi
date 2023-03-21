import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface post {
  title: string;
}

interface postState {
  title: post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: postState = {
  title: [],
  isLoading: false,
  error: null,
};

export const fetchPost = createAsyncThunk("displayPost/fetchPost", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const postSlice = createSlice({
  name: "displayPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.title = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default postSlice.reducer;

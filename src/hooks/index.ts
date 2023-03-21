import { configureStore } from "@reduxjs/toolkit";
import  fetchPost from "../store";

export const store = configureStore({
  reducer: {
    displayPost: fetchPost,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

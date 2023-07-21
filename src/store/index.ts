import { configureStore } from "@reduxjs/toolkit";
import liftReducer from "./liftSlice";

export const store = configureStore({
  reducer: {
    lift: liftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

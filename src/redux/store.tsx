import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./reducers";

const store = configureStore({
  reducer: {
    tokenbalance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

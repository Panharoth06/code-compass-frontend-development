import { configureStore } from "@reduxjs/toolkit";
import { submissionApi } from "./services/submission/submissionApi";
import { problemApi } from "./services/problem/problem";
import { signUpApi } from "./services/signUp/signUp";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [submissionApi.reducerPath]: submissionApi.reducer,
      [problemApi.reducerPath]: problemApi.reducer,
      [signUpApi.reducerPath]: signUpApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        submissionApi.middleware,
        problemApi.middleware,
        signUpApi.middleware,
      ]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

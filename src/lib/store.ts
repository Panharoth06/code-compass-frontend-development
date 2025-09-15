import { configureStore } from "@reduxjs/toolkit";
import { submissionApi } from "./services/submission/submissionApi";
import { problemApi } from "./services/problem/problemApi";
import { signUpApi } from "./services/signUp/signUp";
import { userApi } from "./services/user/userApi";
import { hintApi } from "./services/hint/hintApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [submissionApi.reducerPath]: submissionApi.reducer,
      [problemApi.reducerPath]: problemApi.reducer,
      [signUpApi.reducerPath]: signUpApi.reducer,
      [hintApi.reducerPath]: hintApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        submissionApi.middleware,
        problemApi.middleware,
        signUpApi.middleware,
        hintApi.middleware,
        userApi.middleware,
      ]),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

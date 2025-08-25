import { configureStore } from '@reduxjs/toolkit'
import { judge0Api } from './services/judge0/judge0'
import { problemApi } from './services/problem/problem'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [judge0Api.reducerPath]: judge0Api.reducer,
      [problemApi.reducerPath]: problemApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(judge0Api.middleware)
                            .concat(problemApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
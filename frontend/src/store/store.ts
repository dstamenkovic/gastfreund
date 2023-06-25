import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { tasksApi } from 'services/tasks'
import dashReducer from 'store/dashSlice'

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    dash: dashReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tasksApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

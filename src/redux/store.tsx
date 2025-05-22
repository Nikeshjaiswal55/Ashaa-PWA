import { configureStore } from '@reduxjs/toolkit'
import steaperReducer from './slices/SteaperSlice'

export const store = configureStore({
  reducer: {
    steaper: steaperReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
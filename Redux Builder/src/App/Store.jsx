import { configureStore } from '@reduxjs/toolkit'
import apiReducer from '../Feature/ApiSlice'

export const store = configureStore({
  reducer: {
    ApiKey: apiReducer
  },
})

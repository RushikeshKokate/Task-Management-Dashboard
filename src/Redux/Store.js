import { configureStore } from '@reduxjs/toolkit'
import  TaskReducer  from './TaskSlice'

export const store = configureStore({
  reducer: {
    NewTask: TaskReducer
  },
})
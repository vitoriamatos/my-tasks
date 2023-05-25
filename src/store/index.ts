import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/Task'
import filterReducer from './reducers/Filter'

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
export default store

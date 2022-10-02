import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { DoneReducer } from '../Reducers/DoneReducer'
import { DoingReducer } from '../Reducers/DoingReducer'
import { TodoReducer } from '../Reducers/TodoReducer'
import { Status } from '../Models/Backlog.Model'

const rootReducer = combineReducers({
  [Status.TODO]: TodoReducer,
  [Status.DOING]: DoingReducer,
  [Status.DONE]: DoneReducer,
})
export const CardStore = configureStore({ reducer: rootReducer })

import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { postReducer } from "./reducers/post-reducer"

const rootReducer = combineReducers({
  post: postReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import user from './reducers/user'
import bill from './reducers/bill';


const store = createStore(combineReducers({
  user,
  bill,
}), applyMiddleware(thunk))

export default store
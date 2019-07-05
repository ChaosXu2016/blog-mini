import { combineReducers } from 'redux'
import counter from './counter'
import userInfo from './userInfo'

export default combineReducers({
  counter,
  userInfo
})

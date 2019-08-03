import { combineReducers } from 'redux'
import openId from './openId'
import userInfo from './userInfo'

export default combineReducers({
  openId,
  userInfo
})

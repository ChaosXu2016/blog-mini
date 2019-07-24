import { ADD, MINUS } from '../constants/counter'
import { WECHAT_USERINFO_SET } from '@/constants/actionTypes'

const INITIAL_STATE = {
  num: 0
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
     case MINUS:
       return {
         ...state,
         num: state.num - 1
       }
    case WECHAT_USERINFO_SET:
       return {
         ...state,
         num: 999
       }
    default:
       return state
  }
}

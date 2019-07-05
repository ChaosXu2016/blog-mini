import { WECHAT_USERINFO_SET } from '../constants/actionTypes'

const userInfo = null

export default function counter (state = userInfo, action) {
  switch (action.type) {
    case WECHAT_USERINFO_SET:
      return action.userInfo
     default:
       return state
  }
}

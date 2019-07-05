import { WECHAT_USERINFO_SET } from '@/constants/actionTypes'

export const setUserInfo = (userInfo: any) => ({
  type: WECHAT_USERINFO_SET,
  userInfo
})

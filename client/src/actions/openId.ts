import { OPEN_ID_SET } from '@/constants/actionTypes'

export const openIdSet = openId => {
  return {
    type: OPEN_ID_SET,
    openId
  }
}

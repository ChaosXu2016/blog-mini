import { OPEN_ID_SET } from '@/constants/actionTypes'

const openId = ''

export default function counter (state = openId, action) {
  switch (action.type) {
    case OPEN_ID_SET:
       return action.openId
    default:
       return state
  }
}

import { baseRequest } from '@/common/request'

const userName = 'chaosxu2016'

export const getUserReceivedEvent = (page = 1) => baseRequest.get(`/users/${userName}/received_events`, { data: { page } })

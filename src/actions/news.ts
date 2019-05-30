import { zhihuRequest } from '@/common/request'

export const getTopStories = () => zhihuRequest.get('/api/3/news/latest')

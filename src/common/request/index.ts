import Taro from '@tarojs/taro'
import ApiManager from './ApiManager'

const baseRequest = new ApiManager({
  baseURL: 'https://api.github.com'
}, Taro.request)


export {
  baseRequest
}

import InterceptorManager from './InterceptorManager'

// 全局拦截器
const requestInterceptor = new InterceptorManager()
const responseInterceptor = new InterceptorManager()

function isUrl(url: string) {
  const regExp = /^(https|http|ftp|rtsp|mms)?:\/\//
  return regExp.test(url)
}

class ApiManager {
  static interceptors = {
    request: requestInterceptor,
    response: responseInterceptor
  }
  /**
   * 除了原有的配置，加上了baseURL配置
   * @param {Object} baseConfig 
   */
  api: (res: any) => Promise<any>
  baseConfig: any
  interceptors: {
    request: InterceptorManager
    response: InterceptorManager
  }
  constructor(baseConfig = {}, api: (res: any) => Promise<any>) {
    this.api = api
    this.baseConfig = baseConfig
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }
  get(url, config?: any) {
    return this.request({
      url: url,
      method: 'GET',
      ...config
    })
  }
  post(url, data?: any, config?: any) {
    return this.request({
      header: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      url: url,
      data: data,
      method: 'POST',
      ...config
    })
  }
  put(url, data?: any, config?: any) {
    return this.request({
      header: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      url: url,
      data: data,
      method: 'PUT',
      ...config
    })
  }
  delete(url, config?: any) {
    return this.request({
      url: url,
      method: 'DELETE',
      ...config
    })
  }
  request({
    method = 'GET',
    url,
    data,
    header = {}
  }) {
    const config = {
      method,
      url,
      data,
      header
    }
    const requestConfig = Object.assign({}, config, this.baseConfig)
    requestConfig.header = Object.assign({}, config.header || {}, this.baseConfig.header || {})
    if (requestConfig.baseURL && !isUrl(requestConfig.url)) {
      requestConfig.url = requestConfig.baseURL + requestConfig.url
    }
    let promise = Promise.resolve(requestConfig)
    let chain: any[] = []
    requestInterceptor.interceptors.forEach(item => {
      chain = chain.concat(item || [])
    })
    this.interceptors.request.interceptors.forEach(item => {
      chain = chain.concat(item || [])
    })
    chain = chain.concat([this.api, undefined])
    this.interceptors.response.interceptors.forEach(item => {
      chain = chain.concat(item || [])
    })
    responseInterceptor.interceptors.forEach(item => {
      chain = chain.concat(item || [])
    })
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
  }
}

export default ApiManager

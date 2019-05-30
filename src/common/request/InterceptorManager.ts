class InterceptorManager {
  interceptors: any[]
  constructor() {
    this.interceptors = []
  }
  add(resolve: (e: any) => any, reject?: (e: any) => any) {
    return this.interceptors.push([resolve, reject])
  }
  remove(id: number) {
    this.interceptors[id - 1] = null
  }
  clean() {
    this.interceptors = []
  }
}

export default InterceptorManager

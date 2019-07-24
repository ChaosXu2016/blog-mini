type Exec = {
  fn: any
  caller: any
  args: any[]
}

class Schedule {
  private _status: boolean = false
  queue: Exec[] = []
  get status() {
    return this._status
  }
  set status(status) {
    this._status = status
    this.exec()
  }
  exec() {
    while(this.queue.length) {
      const { fn, caller, args } = this.queue.shift() as Exec
      fn.call(caller, args)
    }
  }
  ready(exec: Exec) {
    this.queue.push(exec)
    if(this._status) {
      this.exec()
    }
  }
}

export default Schedule

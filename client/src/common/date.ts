function isISOString(str: string): boolean {
  const regExp = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/
  return regExp.test(str)
}
function pad(val: number | string, len = 2) {
  let padVal = '' + val;
  while(padVal.length<len) {
    padVal = '0' + padVal
  }
  return padVal;
}
type DateParse = {
  fullYear: number
  month: number
  date: number
  day: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}
type SetType = 'year' | 'day' | 'month' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
class DateX {
  $date: Date = new Date()
  $parse: DateParse
  $timestamp: number = 0
  constructor(...args) {
    this.$date = this.getDate(args)
    this.$parse = this.parse(this.$date)
    this.$timestamp = this.$date.getTime()
  }
  private getDate(args: any[]): Date {
    if(args.length === 1) {
      if(typeof args[0] === 'number') {
        return this.getDateWithTimestamp(args[0])
      } else {
        return this.getDateWithString(args[0])
      }
    } else if (args.length === 0){
      return new Date()
    } else {
      const [year, monthIndex, ...options] = args
      return this.getDateWithMutipleArgs(year, monthIndex, ...options)
    }
  }
  private getDateWithString(str): Date {
    if(isISOString(str)) {
      return new Date(str)
    } else {
      return new Date(str.replace(/\-/g, '/').replace(/T/g, ' ').split('.')[0])
    }
  }
  private getDateWithTimestamp(timestamp: number): Date {
    return new Date(timestamp)
  }
  private getDateWithMutipleArgs(year, monthIndex, day = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    return new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
  }
  private parse(d: Date): DateParse {
    return {
      fullYear: d.getFullYear(),
      month: d.getMonth() + 1,
      date: d.getDate(),
      day: d.getDay(),
      hours: d.getHours(),
      minutes: d.getMinutes(),
      seconds: d.getSeconds(),
      milliseconds: d.getMilliseconds()
    }
  }
  set(n: number, type: SetType) {
    let { fullYear, month, date, hours, minutes, seconds, milliseconds } = this.$parse
    switch(type) {
      case 'year': 
        fullYear = n
        break
      case 'month': 
        month = n
        break
      case 'day': 
        date = n
        break
      case 'hours':
        hours = n
        break
      case 'minutes':
        minutes = n
        break
      case 'seconds':
        seconds = n
        break
      case 'milliseconds':
        milliseconds = n
        break
    }
    this.$date = this.getDateWithMutipleArgs(fullYear, month - 1, date, hours, minutes, seconds, milliseconds)
    return this
  }
  setYear(n: number) {
    return this.set(n, 'year')
  }
  setMonth(n: number) {
    return this.set(n, 'month')
  }
  setDay(n: number) {
    return this.set(n, 'day')
  }
  setHours(n: number) {
    return this.set(n, 'hours')
  }
  setMinutes(n: number) {
    return this.set(n, 'minutes')
  }
  setSeconds(n: number) {
    return this.set(n, 'seconds')
  }
  setMilliseconds(n: number) {
    return this.set(n, 'milliseconds')
  }
  format(fmtstr: string = 'YYYY-MM-DD HH:mm:ss') {
    let dateStr = fmtstr
    dateStr = dateStr.replace(/YYYY+/, this.$parse.fullYear as any)
    dateStr = dateStr.replace(/MM+/, pad(this.$parse.month))
    dateStr = dateStr.replace('M', this.$parse.month as any)
    dateStr = dateStr.replace(/DD+/, pad(this.$parse.date))
    dateStr = dateStr.replace('D', this.$parse.date as any)
    dateStr = dateStr.replace(/hh+/, pad(this.$parse.hours % 12 || 12))
    dateStr = dateStr.replace('h', this.$parse.hours % 12 || 12 as any)
    dateStr = dateStr.replace(/HH+/, pad(this.$parse.hours))
    dateStr = dateStr.replace('H', this.$parse.hours as any)
    dateStr = dateStr.replace(/mm+/, pad(this.$parse.minutes))
    dateStr = dateStr.replace('m', this.$parse.minutes + '')
    dateStr = dateStr.replace(/ss+/, pad(this.$parse.seconds))
    dateStr = dateStr.replace('s', this.$parse.seconds as any)
    dateStr = dateStr.replace('S', pad(this.$parse.milliseconds, 3))
    return dateStr
  }
}

function getRecentStr(...args) {
  const datex = new DateX(...args)
  const now = new DateX()
  const timestamp = now.$timestamp - datex.$timestamp
  const hour = Math.floor(timestamp / 3600000)
  if(hour < 0) {
    return '1小时'
  }
  if(hour < 24) {
    return `${hour}小时之前`
  }
  return `${Math.floor(hour/24)}天前`
}

export {
  DateX,
  getRecentStr
}

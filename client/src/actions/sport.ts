import Taro from '@tarojs/taro'

type Sport = {
  readonly _id?: string
  readonly _openid?: string
  name: string
  mark: string
  value: number
  unit: number
  group_num: number
  sleep_time: string
  create_time?: Date
  update_time?: Date
}

type SportQuery = {
  name?: string
  mark?: string
  value?: number
  unit?: number
  group_num?: number
  sleep_time?: string
  create_time?: Date
  update_time?: Date
}

const sportDbPromise = (name: string, data: any) => new Promise((resolve, reject) => {
  Taro.cloud.callFunction({
    name: 'sport',
    data: {
      name,
      data
    },
    success: resolve,
    fail: reject
  })
})

export const add = (sport: Sport) => sportDbPromise('add', sport)

export const update = (id: string, sport: Sport) => sportDbPromise('update', {id, sport})

export const list = (sport: SportQuery) => sportDbPromise('list', sport)

export const detail = (_id: string) => sportDbPromise('detail', _id)

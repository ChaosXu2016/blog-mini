import { db } from '@/common/cloud'

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

export const sportAdd = (sport: Sport) => {
  sport.create_time = new Date()
  sport.update_time = new Date()
  return new Promise((resolve, reject) => {
    db.collection('sport').add({
      data: sport,
      success: resolve,
      fail: reject
    })
  })
}

export const sportUpdate = (id: string, sport: Sport) => {
  sport.create_time = undefined
  sport.update_time = new Date()
  if(id) {
    return new Promise((resolve, reject) => {
      db.collection('sport').doc(id as string).update({
        data: sport,
        success: resolve,
        fail: reject
      })
    })
  } else {
    return Promise.reject('id is required')
  }
}

export const sports = (sport: Sport) => new Promise((resolve, reject) => {
  db.collection('sport').where(sport).get({
    success: resolve,
    fail: reject
  })
})

export const sportDetail = (_id: string) => new Promise((resolve, reject) => {
  db.collection('sport').doc(_id as string).get({
    success: resolve,
    fail: reject
  })
})

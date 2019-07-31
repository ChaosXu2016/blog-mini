import Taro from '@tarojs/taro'

type Blog = {
  readonly _id?: string
  readonly _openid?: string
  title: string
  sub_title: string
  content: string
  create_time?: Date
  update_time?: Date
}

type BlogQuery = {
  title?: string
  sub_title?: string
  create_time?: Date
  update_time?: Date
}

const blogDbPromise = (name: string, data: any) => new Promise((resolve, reject) => {
  Taro.cloud.callFunction({
    name: 'blog',
    data: {
      name,
      data
    },
    success: resolve,
    fail: reject
  })
})

export const add = (blog: Blog) => blogDbPromise('add', blog)

export const update = (id: string, blog: Blog) => blogDbPromise('update', {id, blog})

export const list = (blog: BlogQuery) => blogDbPromise('list', blog)

export const detail = (_id: string) => blogDbPromise('detail', _id)

export const remove = (_id: string) => blogDbPromise('remove', _id)

const cloud = require('wx-server-sdk')

cloud.init({ env: 'einfo-wechat-1a2c07' })
const db = cloud.database({ env: 'einfo-wechat-1a2c07' })
const collection = 'todos'

const add = sport => {
  sport.create_time = new Date()
  sport.update_time = new Date()
  return db.collection(collection).add({
    data: sport
  })
}

const update = ({id, sport}) => {
  sport.create_time = undefined
  sport.update_time = new Date()
  if(id) {
    return db.collection(collection).doc(id).update({
      data: sport
    })
  } else {
    return Promise.reject('id is required')
  }
}

const list = sport => db.collection(collection).where(sport).get()

const detail = _id => db.collection(collection).doc(_id).get()

const remove = _id => db.collection(collection).doc(_id).remove()

exports.main = async event => {
  const { OPENID } = cloud.getWXContext()
  const { name, data } = event
  console.log(data)
  switch(name) {
    case 'list':
      return list({ ...data, openid: OPENID })
    case 'add':
      return add({ ...data, openid: OPENID})
    case 'update':
      return update(data)
    case 'detail':
      return detail(data)
    case 'remove':
      return remove(data)
    default:
      return Promise.resolve('function not found')
  }
}

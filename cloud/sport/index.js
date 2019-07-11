const cloud = require('wx-server-sdk')

cloud.init({ env: 'einfo-wechat-1a2c07' })
const db = cloud.database({ env: 'einfo-wechat-1a2c07' })

const add = sport => {
  sport.create_time = new Date()
  sport.update_time = new Date()
  return db.collection('sport').add({
    data: sport
  })
}

const update = ({id, sport}) => {
  sport.create_time = undefined
  sport.update_time = new Date()
  if(id) {
    return db.collection('sport').doc(id).update({
      data: sport
    })
  } else {
    return Promise.reject('id is required')
  }
}

const list = sport => db.collection('sport').where(sport).get()

const detail = _id => db.collection('sport').doc(_id).get()

exports.main = async event => {
  const { OPENID } = cloud.getWXContext()
  const { name, data } = event
  switch(name) {
    case 'list':
      return list({ ...data, _openid: OPENID })
    case 'add':
      return add(data)
    case 'update':
      return update(data)
    case 'detail':
      return detail(data)
    default:
      return Promise.resolve('function not found')
  }
}

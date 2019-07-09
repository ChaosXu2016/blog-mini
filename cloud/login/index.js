const cloud = require('wx-server-sdk')

cloud.init({ env: 'einfo-wechat' })

exports.main = (event, context) => {
  return cloud.getWXContext()
}

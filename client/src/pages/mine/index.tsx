import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import defaultAvatar from '@/assets/imgs/avatar.png'

import './index.less'
import { connect } from '@tarojs/redux';
import { setUserInfo } from '@/actions/userInfo';
import store from '@/store'
import { gender } from '@/constants/enums'

interface Mine {
  props: {
    userInfo: any,
    setUserInfo: any
  }
}

@connect(({ userInfo }) => ({ userInfo }), dispatch => ({
  setUserInfo(userInfo) {
    dispatch(setUserInfo(userInfo))
  }
}))
class Mine extends Component {
  static defaultProps = {
    userInfo: store.getState().userInfo
  }
  constructor(props) {
    super(props)
  }
  componentDidShow() {
  }
  handleGetUserInfo(e) {
    if(e.detail.userInfo) {
      this.props.setUserInfo(e.detail.userInfo)
    }
  }
  render() {
    const userInfo = this.props.userInfo || {}
    return (
      <View className="page-view">
        <View className="info-card">
          {
            !userInfo.avatarUrl ? (
              <View className="auth-btn-view">
                点击获取个人信息
                <Button openType="getUserInfo" onGetUserInfo={this.handleGetUserInfo.bind(this)}></Button>
              </View>
            ) : null
          }
          <View className="base-info-view">
            <View className="avatar-view">
              <Image className="avatar-image" src={userInfo.avatarUrl || defaultAvatar}></Image>
            </View>
            <View className="base-info">
              <View className="info-item-view">
              <Text className="info-key">昵称：</Text>{userInfo.nickName}
              </View>
              <View className="info-item-view">
                <Text className="info-key">性别：</Text>{gender[userInfo.gender] || '未知'}
              </View>
            </View>
          </View>
          <View className="desc-view">
            生活不能等待别人来安排，要自己去争取和奋斗；而不论其结果是喜是悲，但可以慰藉的是，你总不枉在这世界上活了一场。
          </View>
        </View>
        <View className="setting-item blog-item">
          
        </View>
      </View>
    )
  }
}

export default Mine

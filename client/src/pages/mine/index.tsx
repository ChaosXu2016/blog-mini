import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import defaultAvatar from '@/assets/imgs/avatar.png'

import './index.less'
import { connect } from '@tarojs/redux'
import { setUserInfo } from '@/actions/userInfo'
import store from '@/store'
import { gender } from '@/constants/enums'
import settingSportIcon from '@/assets/imgs/mine/setting/icon_sport.png'
import settingLearnIcon from '@/assets/imgs/mine/setting/learn_line.png'
import settingRightArrowIcon from '@/assets/imgs/mine/setting/arrow-right.png'
import settingScheduleIcon from '@/assets/imgs/mine/setting/schedule.png'

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
    console.log(props.userInfo)
  }
  componentDidShow() {
  }
  handleGetUserInfo(e) {
    if(e.detail.userInfo) {
      this.props.setUserInfo(e.detail.userInfo)
    }
  }
  toSportList() {
    Taro.navigateTo({
      url: '/pages/sport/list/index'
    })
  }
  toLearnList() {
    Taro.showToast({title: '正在开发', icon: 'none'})
  }
  toScheduleList() {
    Taro.showToast({title: '正在开发', icon: 'none'})
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
        <View className="setting-container">
          <View className="setting-item touch-able" onClick={this.toScheduleList.bind(this)}>
            <Image className="setting-icon" src={settingScheduleIcon}></Image>
            <Text className="setting-title">每日计划管理</Text>
            <Image className="right-arrow-icon" src={settingRightArrowIcon}></Image>
          </View>
          <View className="setting-item touch-able" onClick={this.toSportList.bind(this)}>
            <Image className="setting-icon" src={settingSportIcon}></Image>
            <Text className="setting-title">运动类项目管理</Text>
            <Image className="right-arrow-icon" src={settingRightArrowIcon}></Image>
          </View>
          <View className="setting-item touch-able" onClick={this.toLearnList.bind(this)}>
            <Image className="setting-icon" src={settingLearnIcon}></Image>
            <Text className="setting-title">学习类项目管理</Text>
            <Image className="right-arrow-icon" src={settingRightArrowIcon}></Image>
          </View>
        </View>
      </View>
    )
  }
}

export default Mine

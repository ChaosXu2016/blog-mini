import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'
import CommonButton from '@/components/button'

class Mine extends Component {
  constructor(props) {
    super(props)
  }
  componentDidShow() {
  }
  toFindIBeacon() {
  }
  render() {
    return (
      <View className="page-view">
        <View className="btn-container">
          <CommonButton onClick={this.toFindIBeacon.bind(this)} type="primary" size="large">开始搜索</CommonButton>
        </View>
        <View className="btn-container">
          <CommonButton onClick={this.toFindIBeacon.bind(this)} type="primary" size="medium">开始搜索</CommonButton>
        </View>
        <View className="btn-container">
          <CommonButton onClick={this.toFindIBeacon.bind(this)} type="primary" size="mini">开始搜索</CommonButton>
        </View>
        <View className="btn-container">
          <CommonButton onClick={this.toFindIBeacon.bind(this)} type="text" size="mini">开始搜索</CommonButton>
        </View>
      </View>
    )
  }
}

export default Mine

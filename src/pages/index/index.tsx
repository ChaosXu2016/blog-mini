import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Textarea } from '@tarojs/components'
import Navigation from '@/components/navigation'
import { navigationHeightRpx } from '@/common/system'

import './index.less'

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  onPullDownRefresh() {
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 5000)
  }
  render () {
    return (
      <View className='page-view-outer' style={{paddingTop: navigationHeightRpx + 'rpx'}}>
        <Navigation title="首页"></Navigation>
        <View className="index-page-body">
          <Text>测试下拉刷新</Text>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <View className="height-200"></View>
          <Textarea style={{background: '#eee'}} value="测试下拉刷新测试下拉刷新测试下拉刷新测试下拉刷新测试下拉刷新测试下拉刷新"></Textarea>
        </View>
      </View>
    )
  }
}

export default Index

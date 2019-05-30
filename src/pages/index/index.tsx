import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.less'

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  render () {
    return (
      <View className="page-view-outer">
        <View className="index-page-body">
          <Text className="font-weight-text font-weight-500">font-weight-500</Text>
          <Text className="font-weight-text font-weight-600">font-weight-600</Text>
          <Text className="font-weight-text font-weight-700">font-weight-700</Text>
          <Text className="font-weight-text font-weight-bold">font-weight-bold</Text>
          <Text className="font-weight-text font-weight-bolder">font-weight-bolder</Text>
        </View>
      </View>
    )
  }
}

export default Index

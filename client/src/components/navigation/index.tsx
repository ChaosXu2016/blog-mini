import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { statusBarHeightRpx, navigationBodyHeightRpx } from '@/common/system'
import './index.less'

interface Navigation {
  props: {
    title: string
  }
}

class Navigation extends Component {
  render() {
    const { title } = this.props
    return (
      <View className="navigation-top" style={{height: navigationBodyHeightRpx + 'rpx', paddingTop: statusBarHeightRpx + 'rpx'}}>
        <Text>{title}</Text>
      </View>
    )
  }
}

export default Navigation

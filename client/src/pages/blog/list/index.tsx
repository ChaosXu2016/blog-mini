import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import RefreshView from '@/components/view/refresh'
import { windowHeightRpx } from '@/common/system'

import { getUserReceivedEvent } from '@/actions/events'
import { getRecentStr } from '@/common/date'

import './index.less'

interface BlogList {
  state: {
    refreshing: boolean
    hasMore: boolean
    listData: any[]
  }
}

class BlogList extends Component {
  config: Config = {
    navigationBarTitleText: '博客列表',
    disableScroll: true
  }
  data = {
    refreshing: false,
    hasMore: true,
    listData: []
  }
  page = 0
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidMount() {
    this.handleRefresh()
  }
  handleRefresh() {
    this.setState({
      refreshing: true,
      hasMore: true
    })
    getUserReceivedEvent(this.page).then(res => {
      this.setState({
        refreshing: false
      })
      this.resolveList(res.data, true)
    })
  }
  resolveList(list, isRefresh = false) {
    if(list instanceof Array) {
      if(isRefresh) {
        this.setState({
          listData: list
        })
      } else {
        this.setState({
          listData: [
            ...this.state.listData,
            ...list
          ]
        })
      }
    } else {
      this.setState({
        hasMore: false
      })
    }
  }
  handleLoadMore() {
    this.setState({
      refreshing: true
    })
    this.page = this.page + 1
    getUserReceivedEvent(this.page).then(res => {
      this.setState({
        refreshing: false
      })
      this.resolveList(res.data, false)
    })
  }
  render() {
    const { listData } = this.state
    return (
      <View>
        <RefreshView
          scrollViewHeight={windowHeightRpx}
          onRefresh={this.handleRefresh.bind(this)}
          onLoadMore={this.handleLoadMore.bind(this)}
          refreshing={this.state.refreshing}
          hasMore={this.state.hasMore}
        >
          {
            listData.map(item => (
              <View key={item.id} className="event-item">
                <View className="actor-view">
                  <Image className="actor-avatar" src={item.actor.avatar_url}></Image>
                  <Text className="actor-name">{item.actor.login}</Text>
                  <Text className="actor-repo-time">{getRecentStr(item.created_at)}</Text>
                </View>
                <View className="action-view">
                  <Text className="actor-action">{item.payload.action}</Text>
                  <Text className="actor-repo-name">{item.repo.name}</Text>
                </View>
              </View>
            ))
          }
        </RefreshView>
      </View>
    )
  }
}

export default BlogList

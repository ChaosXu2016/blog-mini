import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Fab from '@/components/fab'

import { list, remove } from '@/actions/blog'

import './index.less'

interface BlogList {
  state: {
    listData: any[]
  }
}

class BlogList extends Component {
  config: Config = {
    navigationBarTitleText: '博客列表',
    enablePullDownRefresh: true
  }
  data = {
    listData: []
  }
  page = 0
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidShow() {
    this.getBlogList()
  }
  onPullDownRefresh() {
    this.getBlogList().then(() => {
      Taro.stopPullDownRefresh()
    }).catch(() => {
      Taro.stopPullDownRefresh()
    })
  }
  getBlogList() {
    return list({}).then((res: any) => {
      this.setState({
        listData: res.result.data
      })
    })
  }
  toBlogAdd() {
    Taro.navigateTo({
      url: '/pages/blog/edit/index'
    })
  }
  toDetail(id) {
    Taro.navigateTo({
      url: `/pages/blog/detail/index?id=${id}`
    })
  }
  delete(id) {
    Taro.showModal({
      title: '提示',
      content: '确认删除该记录？',
      success: res => {
        if (res.confirm) {
          return remove(id).then(() => {
            Taro.showToast({ icon: 'none', title: '删除成功' })
            this.getBlogList()
          })
        } else {
          return Promise.reject('取消删除')
        }
      }
    })
  }
  render() {
    const { listData } = this.state
    return (
      <View>
        {
          listData.map(item => (
            <View key={item._id} className="event-item touch-able" onClick={() => this.toDetail(item._id)}>
              <View className="title-view">
                <Text className="title-text">{item.title}</Text>
              </View>
              <View className="sub-title-view">
                <Text className="sub-title-text">{item.sub_title}</Text>
              </View>
              <View className="operate-view">
                <Text className="can-click-text" onClick={e => { e.stopPropagation(); this.delete(item._id);}}>删除</Text>
              </View>
            </View>
          ))
        }
        <Fab onClick={this.toBlogAdd.bind(this)}></Fab>
      </View>
    )
  }
}

export default BlogList

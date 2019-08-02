import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Fab from '@/components/fab'
import MdReader from '@/components/markdown/reader'
import CommonButton from '@/components/button'
import { DateX } from '@/common/date'

import { list, remove } from '@/actions/blog'

import './index.less'

interface BlogList {
  state: {
    listData: any[]
  }
}

class BlogList extends Component {
  config: Config = {
    navigationBarTitleText: '朝花夕拾',
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
  toEdit(id) {
    Taro.navigateTo({
      url: `/pages/blog/edit/index?id=${id}`
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
      <View className="list-container">
        {
          listData.map(item => (
            <View key={item._id} className="daily-item">
              <View className="daily-header">
                <View className="daily-dot"></View>
                <View className="daily-time">{new DateX(item.update_time).format()}</View>
              </View>
              <View className="daily-body">
                <View className="md-reader-container">
                  <MdReader content={item.content}></MdReader>
                </View>
                <View className="operate-view">
                  <CommonButton size="medium" type="text" onClick={() => this.toEdit(item._id)}>编辑</CommonButton>
                  <CommonButton size="medium" type="text" onClick={() => this.delete(item._id)}>删除</CommonButton>
                </View>
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

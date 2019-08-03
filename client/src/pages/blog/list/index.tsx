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

const demo = {
  "content": "这是一个简化版的`markdown`编辑器↵因为实在设计不好页面，再加上小程序的`textarea`的限制，所以没有做快捷选项。↵可以支持的功能如下：↵# 标题一↵## 标题二↵### 标题三↵#### 标题四↵> 引用文本↵普通文本的**加粗**，还有`code`（没有做关键词高亮等解析）。↵↵键盘上点击完成时保存输入内容。↵↵![aaa](https://pic1.zhimg.com/v2-bd52e7280c360baf7a729f5ece751a8c.jpg)",
  "create_time": "2019-08-01T06:16:53.387Z",
  "openid": "op0YM0ZEDSQpnXp_zC4kAVydTKzI",
  "sub_title": "这是一个简化版的markdown编辑器因为实在设计不好页面，再加上小程序的textarea的限制，所以没有做快捷选项。可以支持的功能如下：标题一标题二标题三标题四引用文本普通文本的加粗，还有code（没有做关键词高亮等解析）。键盘上点击完成时保存输入内容。",
  "title": "这是一个简化版的markdown编辑器",
  "update_time": "2019-08-02T12:51:37.003Z"
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
      if(!res.result.data.length) {
        this.setState({
          listData: [demo]
        })
      } else {
        this.setState({
          listData: res.result.data
        })
      }
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
                {
                  item._id ? (
                    <View className="operate-view">
                      <CommonButton size="medium" type="text" onClick={() => this.toEdit(item._id)}>编辑</CommonButton>
                      <CommonButton size="medium" type="text" onClick={() => this.delete(item._id)}>删除</CommonButton>
                    </View>
                  ) : null
                }
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

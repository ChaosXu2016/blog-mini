import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import MdEditor from '@/components/mdeditor'
import MdReader from '@/components/markdown/reader'
import { add } from '@/actions/blog'

import './index.less'

interface BlogEdit { }

class BlogEdit extends Component {
  handleSubmit(content) {
    return add({
      title: '测试',
      sub_title: '测试一下',
      content
    })
  }
  render() {
    return (
      <View className="blog-editor">
        {/* <MdEditor onGetValue={this.handleSubmit.bind(this)}></MdEditor> */}
        <MdReader></MdReader>
      </View>
    )
  }
}

export default BlogEdit

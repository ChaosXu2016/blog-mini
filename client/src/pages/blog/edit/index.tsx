import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import MdEditor from '@/components/markdown/editor'
import { textGetter, titleGetter } from '@/common/simplemd/getter'
import { add } from '@/actions/blog'

import './index.less'

interface BlogEdit {
  state: {
    title: string
  }
}

class BlogEdit extends Component {
  data = {
    title: ''
  }
  constructor(props) {
    super(props)
    this.state = this.data
  }
  handleSubmit(content) {
    const splitContent = textGetter(content)
    const title = this.state.title || titleGetter(content)
    return add({
      title,
      sub_title: splitContent,
      content
    })
  }
  handleInput(e) {
    this.setState({
      title: e.detail.value
    })
  }
  render() {
    const title = this.state.title || ''
    return (
      <View className="blog-editor">
        <View className="blog-title">
          <Input className="blog-title-input" placeholder="请输入标题" value={title} onInput={this.handleInput.bind(this)}></Input>
        </View>
        <MdEditor onGetValue={this.handleSubmit.bind(this)}></MdEditor>
      </View>
    )
  }
}

export default BlogEdit

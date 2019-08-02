import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MdEditor from '@/components/markdown/editor'
import { textGetter } from '@/common/simplemd/getter'
import { add, detail, update } from '@/actions/blog'

import './index.less'

interface BlogEdit {
  state: {
    content: string
  }
}

class BlogEdit extends Component {
  config:Config = {
    navigationBarTitleText: '慢慢写'
  }
  data = {
    content: ''
  }
  id = ''
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidMount() {
    this.id = this.$router.params.id
    if(this.id) {
      this.getDetail(this.id)
    }
  }
  handleSubmit(content) {
    if(!content) return
    const splitContent = textGetter(content)
    if(this.id) {
      return update(this.id, {
        sub_title: splitContent,
        content
      })
    } else {
      return add({
        sub_title: splitContent,
        content
      })
    }
  }
  getDetail(id) {
    return detail(id).then((res: any) => {
      const data = res.result.data
      if(data) {
        this.setState({
          content: data.content
        })
      }
    })
  }
  handleInput(e) {
    this.setState({
      title: e.detail.value
    })
  }
  render() {
    return (
      <View className="blog-editor">
        <MdEditor onGetValue={this.handleSubmit.bind(this)} value={this.state.content}></MdEditor>
      </View>
    )
  }
}

export default BlogEdit

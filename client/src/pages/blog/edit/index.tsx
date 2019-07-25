import Taro,{ Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MdEditor from '@/components/mdeditor'
import './index.less'

interface BlogEdit { }

class BlogEdit extends Component {
  render() {
    return (
      <View className="blog-editor">
        <MdEditor></MdEditor>
      </View>
    )
  }
}

export default BlogEdit

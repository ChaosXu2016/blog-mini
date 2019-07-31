import Taro,{ Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MdReader from '@/components/markdown/reader'
import { detail } from '@/actions/blog'
import './index.less'

interface BlogDetail {
  state: {
    content: string
  }
}

class BlogDetail extends Component {
  data = {
    content: ''
  }
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidMount() {
    detail('face13585d4130fd0740dbb35b16e0c4').then((res: any) => {
      const data = res.result.data
      if(data) {
        this.setState({
          content: data.content
        })
      }
    })
  }
  render() {
    const { content } = this.state
    return (
      <View>
        <MdReader content={content}></MdReader>
      </View>
    )
  }
}

export default BlogDetail

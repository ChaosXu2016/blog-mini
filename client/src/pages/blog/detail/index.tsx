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
    detail(this.$router.params.id).then((res: any) => {
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

import Taro,{ Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

import { list } from '@/actions/sport'

interface SportList {
  state: {
    sportArray: any[]
  }
}

class SportList extends Component {
  data = {
    sportArray: []
  }
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidMount() {
  }
  getSportArray() {
    return list({}).then((res: any) => {
      const result = res.result
      this.setState({
        sportArray: result.data
      })
    })
  }
  render() {
    return <View></View>
  }
}

export default SportList

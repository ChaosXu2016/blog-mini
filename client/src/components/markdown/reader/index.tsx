import Taro,{ Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

interface MdReader { }

class MdReader extends Component {
  render() {
    const line = [ { text: '一个js语句是怎么' },
    { style: 'text-bolder', text: '被解析成' },
    { style: 'text-code', text: 'AST' },
    { style: 'text-bolder', text: '的呢？这个中间有两个步骤，一个是' },
    { text: '分词' },
    { style: 'text-bolder', text: '，第二个是' },
    { text: '语义分析' },
    { style: 'text-bolder', text: '，怎么理解这两个东西呢？' } ]
    return (
      <View>
        {
          line.map(item => (
            <Text className={`md-text ${item.style || ''}`}>{item.text}</Text>
          ))
        }
      </View>
    )
  }
}

export default MdReader

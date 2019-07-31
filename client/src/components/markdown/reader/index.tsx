import Taro,{ Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import split from '@/common/simplemd/split'
import './index.less'

interface MdReader {
  props: {
    content: string
  }
}

class MdReader extends Component {
  render() {
    const { content } = this.props
    const splits = split(content)
    return (
      <View className="simple-md-reader">
        {
          splits.map((item, index) => (
            <View className={`md-block ${item.className}`} key={`${index}_${item.className}`}>
              {
                item.content.map((contentItem, contentIndex) => (
                  <Text className={`md-text ${contentItem.style || ''}`} key={`${contentIndex}_${contentItem.style}`}>{contentItem.text}</Text>
                ))
              }
            </View>
          ))
        }
      </View>
    )
  }
}

export default MdReader

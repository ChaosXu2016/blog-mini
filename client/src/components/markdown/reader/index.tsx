import Taro,{ Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import split from '@/common/simplemd/split'
import './index.less'
import styles from '@/common/simplemd/styles'
import CommonImage from '@/components/image'

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
                item.content.map((contentItem, contentIndex) => {
                  if(contentItem.style === styles.IMAGE) {
                    return (
                      <View className={`md-block-view ${contentItem.style || ''}`} key={`${contentIndex}_${Date.now()}`}>
                        <CommonImage src={contentItem.src} mode="aspectFit"></CommonImage>
                      </View>
                    )
                  }
                  return (
                    <Text className={`md-text ${contentItem.style || ''}`} key={`${contentIndex}_${Date.now()}`}>{contentItem.text}</Text>
                  )
                })
              }
            </View>
          ))
        }
      </View>
    )
  }
}

export default MdReader

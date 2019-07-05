import Taro,{ Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

interface FieldItem {
  props: {
    label: string
    inline: boolean
    labelWidth: number
    required?: boolean
    children?: any
    explain?: string
  }
}

class FieldItem extends Component {
  static defaultProps = {
    inline: true,
    labelWidth: 180
  }
  render() {
    const { inline, labelWidth, label, required, explain } = this.props
    return (
      <View className={`field-item ${inline ? 'inline' : ''}`}>
        <View className="field-item-inner">
          <View className="field-item-label" style={{ width: inline ? `${labelWidth}rpx` : '100%' }}>
            {label}
            {
              required ? <Text className="require-font-icon">*</Text> : null
            }
          </View>
          <View className="field-item-form">
            { this.props.children }
          </View>
        </View>
        {
          explain ? (
            <View className="explain-view">
              { explain }
            </View>
          ) : null
        }
      </View>
    )
  }
}

export default FieldItem

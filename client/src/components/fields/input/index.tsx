import Taro,{ Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import './index.less'

interface FieldInput {
  props: {
    placeholder: string
    value: string
    maxlength: number
    onInput?: any
    onFocus?: any
    onBlur?: any
    type: 'text' | 'number' | 'idcard' | 'digit'
  }
}

class FieldInput extends Component {
  static defaultProps = {
    placeholder: '请输入',
    value: '',
    maxlength: 20,
    type: 'text'
  }
  render() {
    const { placeholder, value, onInput, onFocus, onBlur, maxlength, type } = this.props
    return (
      <View className="field-input">
        <Input
          placeholderClass="input-placeholder"
          value={value}
          maxLength={maxlength}
          placeholder={placeholder}
          onInput={onInput}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type}
        ></Input>
      </View>
    )
  }
}

export default FieldInput

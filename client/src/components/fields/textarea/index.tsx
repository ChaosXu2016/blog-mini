import Taro,{ Component } from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import './index.less'

interface FieldTextarea {
  state: {
    length: number
  }
  props: {
    maxlength: number
    value: string
    placeholder: string
    onBlur?: any
    onInput?: any
    onFocus?: any
  }
}

class FieldTextarea extends Component {
  static defaultProps = {
    maxlength: 140,
    value: '',
    placeholder: '请输入'
  }
  data = {
    length: 0
  }
  constructor(props) {
    super(props)
    this.data.length = props.value.length
    this.state = this.data
  }
  handleInput(e) {
    this.props.onInput && this.props.onInput(e)
    const { detail: { value } } = e
    this.setState({
      length: value.length
    })
  }
  render() {
    const { maxlength, value, placeholder, onBlur, onFocus } = this.props
    const length = this.state.length || 0
    return (
      <View className="field-textarea">
        <Textarea
          value={value}
          placeholder={placeholder}
          onBlur={onBlur}
          onInput={this.handleInput.bind(this)}
          onFocus={onFocus}
          placeholderClass="textarea-placeholder"
        ></Textarea>
        <View className="field-textarea-footer">
          {length}/{maxlength}
        </View>
      </View>
    )
  }
}

export default FieldTextarea

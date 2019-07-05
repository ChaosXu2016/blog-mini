import Taro,{ Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

interface Button {
  props: {
    onClick?: any
    children?: any
    size: 'large'|'medium'|'mini'|'full-line'
    type: 'primary'|'text'
  }
}

class Button extends Component {
  static defaultProps = {
    size: 'large',
    type: ''
  }
  render() {
    const { type, size } = this.props
    return (
      <View className={`blog-common-btn ${type} ${size}`} onClick={this.props.onClick}>
        <View className={`blog-common-btn-text`}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default Button

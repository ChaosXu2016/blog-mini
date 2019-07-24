import Taro,{ Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'
import addIcon from '@/assets/imgs/fab/add.png'
import deleteIcon from '@/assets/imgs/fab/delete.png'

const iconMap = {
  add: addIcon,
  delete: deleteIcon
}

interface FabButton {
  props: {
    onClick?: any
    icon: 'add' | 'delete' | string
  }
}

class FabButton extends Component {
  static defaultProps = {
    icon: 'add'
  }
  render() {
    return (
      <View
        className="fab-button"
        onClick={this.props.onClick}
      >
        <Image className="fab-button-img" src={iconMap[this.props.icon] || this.props.icon}></Image>
      </View>
    )
  }
}

export default FabButton

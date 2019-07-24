import Taro,{ Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { units } from '@/constants/enums'
import FabButton from '@/components/fab'
import './index.less'

import { list, remove } from '@/actions/sport'

import deleteIcon from '@/assets/imgs/delete.png'

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
  componentDidShow() {
    this.getSportArray()
  }
  getSportArray() {
    return list({}).then((res: any) => {
      const result = res.result
      this.setState({
        sportArray: result.data
      })
    })
  }
  toAddPage() {
    Taro.navigateTo({
      url: '/pages/sport/edit/index'
    })
  }
  toEditPage(sportId) {
    Taro.navigateTo({
      url: `/pages/sport/edit/index?sportId=${sportId}`
    })
  }
  removeSport(sportId) {
    Taro.showModal({
      title: '提示',
      content: '确认删除该记录？',
      success: res => {
        if (res.confirm) {
          return remove(sportId).then(() => {
            Taro.showToast({ icon: 'none', title: '删除成功' })
            this.getSportArray()
          })
        } else {
          return Promise.reject('取消删除')
        }
      }
    })
  }
  render() {
    const { sportArray } = this.state
    return (
      <View className="list-container">
        {
          sportArray.map(item => (
            <View className="list-item touch-able" key={item._id} onClick={() => this.toEditPage(item._id)}>
              <View className="item-body">
                <View className="item-title">{item.name}</View>
                <View className="item-sub-desc">{item.mark}</View>
              </View>
              <View className="item-operate">
                <Image className="item-delete operate-icon" onClick={e => { e.stopPropagation(); this.removeSport(item._id);}} src={deleteIcon}></Image>
              </View>
              <View className="item-info">
                <View className="info-item">
                  <Text className="info-item-key">数值：</Text>
                  <Text className="info-item-value">{item.value}{units[item.unit]}</Text>
                </View>
                <View className="info-item">
                  <Text className="info-item-key">组数：</Text>
                  <Text className="info-item-value">{item.group_num}</Text>
                </View>
                <View className="info-item">
                  <Text className="info-item-key">间隔：</Text>
                  <Text className="info-item-value">{item.sleep_time}</Text>
                </View>
              </View>
            </View>
          ))
        }
        <FabButton icon="add" onClick={this.toAddPage.bind(this)}></FabButton>
      </View>
    )
  }
}

export default SportList

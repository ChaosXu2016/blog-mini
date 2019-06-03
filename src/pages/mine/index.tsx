import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { getUserReceivedEvent } from '@/actions/events'
import './index.less'
import { DateX } from '@/common/date'
import { rpx2px } from '@/common/system'

interface Mine {
  state: {
    list: any[],
    curIndex: number,
    transition: string
  }
}

const transition = {
  'animate': 'all .5s linear',
  'common': 'all 0 linear'
}

let animateTimeout: any = null
let nextTimeout: any = null

class Mine extends Component {
  data = {
    list: [],
    curIndex: 0,
    transition: transition.animate
  }
  listLength = 0
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidShow() {
    this.getNotice()
  }
  componentDidHide() {
    clearTimeout(animateTimeout)
    clearTimeout(nextTimeout)
  }
  getNotice() {
    return getUserReceivedEvent()
    .then(res => res.data)
    .then(data => {
      const last = {...data[0]}
      last.id = last.id + 'last'
      data.length = 3
      data.push(last)
      this.setState({
        list: data,
        curIndex: 0,
      }, () => {
        this.listLength = this.state.list.length
        this.toNext(0, 2400)
      })
    })
  }
  toNext(curIndex, time) {
    this.setState({
      curIndex
    }, () => {
      animateTimeout = setTimeout(() => {
        if(curIndex + 1 === this.listLength) {
          this.setState({
            transition: transition.common
          })
          this.toNext(0, 1800)
        } else {
          this.setState({
            transition: transition.animate
          })
          nextTimeout = setTimeout(() => {
            this.toNext(curIndex + 1, 2400)
          }, time)
        }
      }, 600)
    })
  }

  render() {
    const { list, curIndex, transition } = this.state
    return (
      <View className="page-view">
        <View className="notice-window">
          <View className="notice-pannel" style={{transform: `translateY(${curIndex * rpx2px(-60)}px)`, transition}}>
          {
            list.map(item => (
              <View className="notice-item" key={item.id}>
                <Image className="notice-avatar" src={item.actor.avatar_url}></Image>
                <Text className="notice-desc">{`${item.actor.login} ${item.payload.action} ${item.repo.name} at ${new DateX(item.created_at).format()}`}</Text>
              </View>
            ))
          }
          </View>
        </View>
      </View>
    )
  }
}

export default Mine

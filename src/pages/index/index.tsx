import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, MovableArea, MovableView } from '@tarojs/components'
import { dataBeauty } from '@/actions/gank'

import './index.less'

interface Index {
  state: {
    cardList: any[]
    curIndex: number
  }
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  data = {
    cardList: [],
    curIndex: 0
  }
  validX = 100
  x = 0
  y = 0
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidMount() {
    this.getList()
  }
  getList() {
    Taro.showLoading({title: '加载中...'})
    return dataBeauty()
    .then(res => res.data.results)
    .then(cardList => {
      Taro.hideLoading()
      this.setState({
        cardList: this.resolveData(cardList, this.state.curIndex)
      })
    }).catch(() => {
      Taro.hideLoading()
    })
  }
  resolveData(cards: any[] = [], curIndex) {
    return cards.map((item, index) => {
      const zIndex = cards.length - index
      let className = 'none'
      if(curIndex === index) {
        className = 'current'
      } else if(curIndex === index + 1) {
        className = 'previous'
      } else if(curIndex === index - 1) {
        className = 'next'
      } else if(curIndex === index - 2) {
        className = 'last'
      }
      return {
        ...item,
        position: item.position || { x: 0, y: 0 },
        className,
        zIndex
      }
    })
  }
  handleChange(e) {
    const { x, y } = e.detail
    this.x = x
    this.y = y
  }
  handleTouchEnd(index) {
    const x = this.x
    const cardList = [...this.state.cardList]
    cardList[index].position.x = this.x
    cardList[index].position.y = this.y
    this.setState({
      cardList
    }, () => {
      const curIndex = this.state.curIndex + 1
      if(Math.abs(x) < this.validX || curIndex >= this.state.cardList.length) {
        cardList[index].position.x = 0
        cardList[index].position.y = 0
        this.setState({
          cardList
        })
        return
      }
      if (x > 0) {
        // 收藏
        cardList[index].position.x = 500
        cardList[index].position.y = 0
      } else {
        // 忽略
        cardList[index].position.x = -500
        cardList[index].position.y = 0
      }
      this.setState({
        curIndex,
        cardList: this.resolveData(cardList, curIndex)
      })
    })
  }
  saveFile(item: any) {
    Taro.setClipboardData({
      data: item.url
    })
  }
  render () {
    const { cardList } = this.state
    return (
      <View className="page-view-outer">
        <MovableArea className="movable-area">
          {
            cardList.map((item, index) => item.className !== 'none' ? (
              <MovableView
                outOfBounds={true}
                key={`${item._id}_${index}`}
                className={`cur-card-container ${item.className}`}
                direction="all"
                style={{ zIndex: item.zIndex }}
                x={item.position.x}
                y={item.position.y}
                damping={50}
                onTouchEnd={() => this.handleTouchEnd(index)}
                onChange={this.handleChange.bind(this)}
              >
                <View className="card-image-view">
                  <Image mode="aspectFill" className="card-image" src={item.url}></Image>
                </View>
                <View className="card-bottom-btn" onClick={() => this.saveFile(item)}>
                  复制图片地址
                </View>
              </MovableView>
            ) : null)
          }
        </MovableArea>
        <View className="background-tips">
          ～～～文明学交互～～～
        </View>
      </View>
    )
  }
}

export default Index

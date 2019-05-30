import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, MovableArea, MovableView } from '@tarojs/components'
import { getTopStories } from '@/actions/news'

import './index.less'

interface Index {
  state: {
    curCard: any
    bgCard: any
    cardList: any[]
    x: number
    y: number
    animation: boolean
  }
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  data = {
    x: 0,
    y: 0,
    animation: true,
    curCard: {},
    bgCard: {},
    cardList: []
  }
  validX = 100
  constructor(props) {
    super(props)
    this.state = this.data
  }
  componentDidMount() {
    this.getList()
  }
  getList() {
    return getTopStories()
    .then(res => res.data.top_stories)
    .then(cardList => {
      this.setState({
        curCard: cardList.pop(),
        bgCard: cardList.pop(),
        cardList
      })
    })
  }
  bindChange(e) {
    const { x, y } = e.detail
    console.log('change call')
    this.setState({
      x,
      y
    })
  }
  bindTouchEnd() {
    let { x, bgCard, cardList } = this.state
    if(Math.abs(x) < this.validX) {
      this.setState({
        x: 0,
        y: 0
      })
      return
    }
    if (x > 0) {
      // 收藏
      this.setState({
        x: 500,
        y: 0
      })
    } else {
      // 忽略
      this.setState({
        x: -500,
        y: 0
      })
    }
    const nextTimeout = setTimeout(() => {
      // getNext
      const curCard = bgCard
      bgCard = cardList.pop()
      this.setState({
        animation: false,
        curCard,
        bgCard,
        cardList
      }, () => {
        this.setState({
          x: 0,
          y: 0
        })
        clearTimeout(nextTimeout)
      })
    }, 800)
  }
  render () {
    const { curCard, bgCard, x, y, animation } = this.state
    return (
      <View className="page-view-outer">
        <MovableArea className="movable-area">
          <MovableView
            className="cur-card-container"
            direction="all"
            outOfBounds={true}
            x={x}
            y={y}
            animation={animation}
            onTouchEnd={this.bindTouchEnd.bind(this)}
            onChange={this.bindChange.bind(this)}
          >
            <Image mode="aspectFill" className="card-image" src={curCard.image}></Image>
          </MovableView>
          <View className="bg-card-container">
            <Image mode="aspectFill" className="card-image" src={bgCard.image}></Image>
          </View>
        </MovableArea>
      </View>
    )
  }
}

export default Index

import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, MovableArea, MovableView } from '@tarojs/components'
import { getTopStories } from '@/actions/news'

import './index.less'

interface Index {
  state: {
    curCard: any
    bgCard: any
    cardList: any[]
    x: number
    y: number
  }
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  data = {
    x: 0,
    y: 0,
    curCard: {},
    bgCard: {},
    cardList: []
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
  handleChange(e) {
    const { x, y } = e.detail
    this.x = x
    this.y = y
  }
  handleTouchEnd() {
    const x = this.x
    this.setState({
      x: this.x,
      y: this.y
    }, () => {
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
    })
  }
  render () {
    const { curCard, bgCard, x, y } = this.state
    return (
      <View className="page-view-outer">
        <MovableArea className="movable-area">
          <MovableView
            className="cur-card-container"
            direction="all"
            x={x}
            y={y}
            damping={50}
            onTouchEnd={this.handleTouchEnd.bind(this)}
            onChange={this.handleChange.bind(this)}
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

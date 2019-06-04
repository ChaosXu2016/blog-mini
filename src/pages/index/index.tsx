import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, MovableArea, MovableView } from '@tarojs/components'
import { getTopStories } from '@/actions/news'

import './index.less'

interface Index {
  state: {
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
        cardList: cardList.map(item => ({
          ...item,
          x: 0,
          y: 0
        }))
      })
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
    cardList[index].x = this.x
    cardList[index].y = this.y
    this.setState({
      cardList
    }, () => {
      if(Math.abs(x) < this.validX) {
        cardList[index].x = 0
        cardList[index].y = 0
        this.setState({
          cardList
        })
        return
      }
      if (x > 0) {
        // 收藏
        cardList[index].x = 500
        cardList[index].y = 0
        this.setState({
          cardList
        })
      } else {
        // 忽略
        cardList[index].x = -500
        cardList[index].y = 0
        this.setState({
          cardList
        })
      }
    })
  }
  render () {
    const { cardList } = this.state
    
    return (
      <View className="page-view-outer">
        <MovableArea className="movable-area">
          {
            cardList.map((item, index) => (
              <MovableView
                key={item.id}
                className="cur-card-container"
                direction="all"
                x={item.x}
                y={item.y}
                damping={50}
                onTouchEnd={() => this.handleTouchEnd(index)}
                onChange={this.handleChange.bind(this)}
              >
                <Image mode="aspectFill" className="card-image" src={item.image}></Image>
              </MovableView>
            ))
          }
          {/* <View className="bg-card-container">
            <Image mode="aspectFill" className="card-image" src={bgCard.image}></Image>
          </View> */}
        </MovableArea>
      </View>
    )
  }
}

export default Index

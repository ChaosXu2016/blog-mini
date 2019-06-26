import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.less'

const store = configStore()

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/blog/list/index',
      'pages/mine/index'
    ],
    window: {
      backgroundColor: '#F4F4F4',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundTextStyle: 'dark',
    },
    tabBar: {
      selectedColor: '#3eaf7c',
      backgroundColor: '#fff',
      color: '#666666',
      list: [{
        text: '卡片',
        pagePath: 'pages/index/index',
        iconPath: 'assets/imgs/tab_bar_index.png',
        selectedIconPath: 'assets/imgs/tab_bar_index_select.png'
      }, {
        text: '刷新',
        pagePath: 'pages/blog/list/index',
        iconPath: 'assets/imgs/tab_bar_blog.png',
        selectedIconPath: 'assets/imgs/tab_bar_blog_select.png'
      }, {
        text: '组件',
        pagePath: 'pages/mine/index',
        iconPath: 'assets/imgs/tab_bar_mine.png',
        selectedIconPath: 'assets/imgs/tab_bar_mine_select.png'
      }]
    }
  }

  componentDidMount () {
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

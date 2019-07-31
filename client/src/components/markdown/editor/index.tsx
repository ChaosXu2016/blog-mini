import Taro,{ Component } from '@tarojs/taro'
import { View, Textarea, Text } from '@tarojs/components'
import CommonButton from '@/components/button'
import './index.less'
import parse from './parse'

interface MdEditor {
  props: {
    onGetValue?: any
  }
  state: {
    value: string
    cursor: number
    focus: boolean
  }
}

class MdEditor extends Component {
  data = {
    value: '',
    cursor: -1,
    focus: false
  }
  lastCursor = 0
  constructor(props) {
    super(props)
    this.state = this.data
  }
  getValue() {
    this.props.onGetValue && this.props.onGetValue(this.state.value)
  }
  addH1() {
    return this.add(parse.h1)
  }
  addH2() {
    return this.add(parse.h2)
  }
  addH3() {
    return this.add(parse.h3)
  }
  addH4() {
    return this.add(parse.h4)
  }
  addBolder() {
    return this.add(parse.bolder)
  }
  addQuote() {
    return this.add(parse.quote)
  }
  add(fn) {
    setTimeout(() => {
      const { value, cursor } = fn(this.state.value, this.lastCursor)
      this.setState({
        value: value, 
        cursor
      }, () => {
        this.setState({
          focus: true
        })
      })
    }, 200)
  }
  handleInput(e) {
    this.setState({
      value: e.detail.value
    })
  }
  handleBlur(e) {
    this.lastCursor = e.detail.cursor
    this.setState({
      focus: false
    })
  }
  handleFocus() {
    this.setState({
      focus: true
    })
  }
  render() {
    const { value, cursor, focus } = this.state
    return (
      <View className="md-editor">
        <View className="operate-container">
          <View className="operate-panel">
            <View className="operate-item title1" onClick={this.addH1.bind(this)}>
              <Text>H1</Text>
            </View>
            <View className="operate-item title1" onClick={this.addH2.bind(this)}>
              <Text>H2</Text>
            </View>
            <View className="operate-item title1" onClick={this.addH3.bind(this)}>
              <Text>H3</Text>
            </View>
            <View className="operate-item title1" onClick={this.addH4.bind(this)}>
              <Text>H4</Text>
            </View>
            <View className="operate-item title1" onClick={this.addBolder.bind(this)}>
              <Text>Bolder</Text>
            </View>
            <View className="operate-item title1" onClick={this.addQuote.bind(this)}>
              <Text>Quote</Text>
            </View>
            <View className="operate-item title1" onClick={this.addQuote.bind(this)}>
              <Text>Image</Text>
            </View>
          </View>
          <CommonButton size="full-line" type="primary" onClick={this.getValue.bind(this)}>获取内容</CommonButton>
        </View>
        <Textarea
          className="editor-text-area"
          cursor={cursor} focus={focus}
          value={value}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onInput={this.handleInput.bind(this)}
        ></Textarea>
      </View>
    )
  }
}

export default MdEditor

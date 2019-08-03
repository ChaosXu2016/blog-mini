import Taro,{ Component } from '@tarojs/taro'
import { View, Textarea, CoverView, CoverImage } from '@tarojs/components'
import './index.less'
import insert from '@/common/simplemd/insert'
import imageIcon from '@/assets/imgs/fab/imgs-exclusive.png'
import { connect } from '@tarojs/redux'
import store from '@/store'

interface MdEditor {
  props: {
    onGetValue?: any,
    value: string,
    openId: any
  }
  state: {
    value: string
    cursor: number
    focus: boolean
  }
}

@connect(({ openId }) => ({ openId }), () => ({}))
class MdEditor extends Component {
  static defaultProps = {
    openId: store.getState().openId
  }
  data = {
    value: '',
    cursor: -1,
    focus: false
  }
  lastCursor = 0
  constructor(props) {
    super(props)
    this.data.value = props.value
    this.state = this.data
  }
  componentWillReceiveProps(newProps) {
    if(newProps.value !== this.props.value) {
      this.setState({
        value: newProps.value
      })
    }
  }
  getValue() {
    this.props.onGetValue && this.props.onGetValue(this.state.value)
  }
  addH1() {
    return this.add(insert.h1)
  }
  addH2() {
    return this.add(insert.h2)
  }
  addH3() {
    return this.add(insert.h3)
  }
  addH4() {
    return this.add(insert.h4)
  }
  addBolder() {
    return this.add(insert.bolder)
  }
  addQuote() {
    return this.add(insert.quote)
  }
  add(fn, args?: any) {
    setTimeout(() => {
      const { value, cursor } = fn(this.state.value, this.lastCursor, args)
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
  componentWillUnmount() {
    this.getValue()
  }
  insertImage() {
    Taro.chooseImage({
      count: 1,
      success: res => {
        const filePath = res.tempFilePaths[0] || ''
        if(filePath) {
          const imgId = filePath.replace(/(.*?)(?=(\w*\.\w*)$)/, '')
          Taro.cloud.uploadFile({
            cloudPath: `markdown.image.${this.props.openId}.${imgId}`,
            filePath: res.tempFilePaths[0],
            success: res => {
              return this.add(insert.image, res.fileID)
            }
          })
        }
      }
    })
  }
  render() {
    const { value, cursor, focus } = this.state
    return (
      <View className="md-editor">
        <Textarea
          className="editor-text-area"
          cursor={cursor} focus={focus}
          value={value}
          placeholder="这里输入内容"
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onInput={this.handleInput.bind(this)}
          maxlength={1000}
        ></Textarea>
        <CoverView className="fab-button" onClick={this.insertImage.bind(this)}>
          <CoverImage src={imageIcon} className="fab-icon"></CoverImage>
        </CoverView>
      </View>
    )
  }
}

export default MdEditor

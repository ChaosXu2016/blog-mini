import Taro,{ Component } from '@tarojs/taro'
import { View, Textarea, CoverView, CoverImage } from '@tarojs/components'
import './index.less'
import insert from '@/common/simplemd/insert'
import { connect } from '@tarojs/redux'
import store from '@/store'
import { rpx2px } from '@/common/system'
import h1Icon from '@/assets/imgs/markdown/h1.png'
import h2Icon from '@/assets/imgs/markdown/h2.png'
import h3Icon from '@/assets/imgs/markdown/h3.png'
import h4Icon from '@/assets/imgs/markdown/h4.png'
import quoteIcon from '@/assets/imgs/markdown/quote.png'
import imageIcon from '@/assets/imgs/markdown/image.png'
import codeIcon from '@/assets/imgs/markdown/code.png'
import boldIcon from '@/assets/imgs/markdown/bold.png'

interface MdEditor {
  props: {
    onGetValue?: any
    value: string
    openId: any
  }
  state: {
    value: string
    cursor: number
    focus: boolean
    textareaHeight: number
  }
}

const bottomHeightPx = rpx2px(100)

const getTextareaHeight = (keyboardHeight = 0) => {
  return Taro.getSystemInfoSync().windowHeight - bottomHeightPx - keyboardHeight
}

@connect(({ openId }) => ({ openId }), () => ({}))
class MdEditor extends Component {
  static defaultProps = {
    openId: store.getState().openId
  }
  data = {
    value: '',
    cursor: -1,
    focus: false,
    textareaHeight: 0
  }
  lastCursor = 0
  constructor(props) {
    super(props)
    this.data.value = props.value
    this.data.textareaHeight = getTextareaHeight()
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
    this.state.value && this.props.onGetValue && this.props.onGetValue(this.state.value)
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
  addCode() {
    return this.add(insert.code)
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
    e.preventDefault()
    this.lastCursor = e.detail.cursor
    this.setState({
      focus: false,
      textareaHeight: getTextareaHeight(0)
    })
  }
  handleFocus(e) {
    const keyboardHeight = e.detail.height
    this.setState({
      focus: true,
      textareaHeight: getTextareaHeight(keyboardHeight)
    })
  }
  render() {
    const { value, cursor, focus, textareaHeight } = this.state
    return (
      <View className="md-editor">
        <Textarea
          className="editor-text-area"
          cursor={cursor} focus={focus}
          value={value}
          style={{ height: textareaHeight + 'px' }}
          showConfirmBar={false}
          placeholder="这里输入内容"
          adjustPosition={false}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onInput={this.handleInput.bind(this)}
          maxlength={1000}
        ></Textarea>
        <CoverView className="operate-pannel" style={{ height: bottomHeightPx + 'px' }}>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addH1.bind(this)}><CoverImage src={h1Icon}></CoverImage></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addH2.bind(this)}><CoverImage src={h2Icon}></CoverImage></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addH3.bind(this)}><CoverImage src={h3Icon}></CoverImage></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addH4.bind(this)}><CoverImage src={h4Icon}></CoverImage></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addQuote.bind(this)}><CoverImage src={quoteIcon}></CoverImage></CoverView>
          <CoverView className="divider"></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addCode.bind(this)}><CoverImage src={codeIcon}></CoverImage></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.addBolder.bind(this)}><CoverImage src={boldIcon}></CoverImage></CoverView>
          <CoverView className="divider"></CoverView>
          <CoverView className="operate-pannel-item img-btn" onTouchStart={this.insertImage.bind(this)}><CoverImage src={imageIcon}></CoverImage></CoverView>
          <CoverView className="divider"></CoverView>
          <CoverView className={`operate-pannel-item text-btn ${value ? '' : 'disabled'}`} onTouchStart={this.getValue.bind(this)}>保存</CoverView>
        </CoverView>
      </View>
    )
  }
}

export default MdEditor

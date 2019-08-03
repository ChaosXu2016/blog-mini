import Taro,{ Component } from '@tarojs/taro'
import { Image } from '@tarojs/components'

interface CommonImage {
  props: {
    src: string
    mode?: "scaleToFill" | "aspectFit" | "aspectFill" | "widthFix" | "top" | "bottom" | "center" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right" | undefined
  }
  state: {
    src: string
  }
}

class CommonImage extends Component {
  static defaultProps = {
    src: ''
  }
  data = {
    src: ''
  }
  constructor(props) {
    super(props)
    this.state = this.data
  }
  
  componentDidMount() {
    this.resolveSrc(this.props.src)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.src !== this.props.src) {
      this.resolveSrc(newProps.src)
    }
  }

  resolveSrc(src: string) {
    const reg = /^cloud:\/\//
    if(reg.test(src)) {
      Taro.cloud.getTempFileURL({
        fileList: [src],
        success: res => {
          this.setState({
            src: res.fileList[0].tempFileURL
          })
        },
        fail: () => {}
      })
    } else {
      this.setState({
        src
      })
    }
  }

  render() {
    const { src } = this.state
    const { mode } = this.props
    return src ? <Image src={src} mode={mode}/> : null
  }
}

export default CommonImage

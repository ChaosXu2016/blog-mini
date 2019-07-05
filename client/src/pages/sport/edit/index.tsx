import Taro,{ Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import CommonButton from '@/components/button'
import FieldItem from '@/components/fields/item'
import FieldInput from '@/components/fields/input'
import { sportAdd, sportUpdate, sportDetail } from '@/actions/sport'
import './index.less'

interface SportAdd {
  state: {
    name: string
    mark: string
    value: number
    unit: number
    group_num: number
    sleep_time: string
  }
}

class SportAdd extends Component {
  config: Config = {
    navigationBarTitleText: '运动'
  }
  sportId: string
  data = {
    name: '',
    mark: '',
    value: 0,
    unit: 0,
    group_num: 1,
    sleep_time: ''
  }
  constructor(props) {
    super(props)
    this.sportId = this.$router.params.sportId
    this.state = this.data
  }
  componentDidMount() {
    if(this.sportId) {
      sportDetail(this.sportId).then((res: any) => {
        this.setState({
          name: res.data.name,
          mark: res.data.mark,
          value: res.data.value,
          unit: res.data.unit,
          group_num: res.data.group_num,
          sleep_time: res.data.sleep_time
        })
      })
    }
  }
  async handleSubmit() {
    let res: any = null
    if(!this.sportId) {
      res = await sportAdd(this.state)
    } else {
      res = await sportUpdate(this.sportId, this.state)
    }
    Taro.showToast({ title: '提交成功', icon: 'none' })
    console.log(res)
  }
  handleInput(key, e) {
    this.setState({
      [key]: e.detail.value
    })
  }
  render() {
    const { name, mark, value, unit, group_num, sleep_time } = this.state
    const range = ['次数', '步数', '时', '分', '秒']
    return (
      <View className="sport-container">
        <View className="field-container">
          <FieldItem label="项目名" required>
            <FieldInput onInput={e => this.handleInput('name', e)} value={name} placeholder="请输入项目名，最多20个字"></FieldInput>
          </FieldItem>
          <FieldItem label="备注">
            <FieldInput onInput={e => this.handleInput('mark', e)} value={mark} placeholder="最多200个字" maxlength={200}></FieldInput>
          </FieldItem>
          <FieldItem label="数值" required>
            <FieldInput onInput={e => this.handleInput('value', e)} value={`${value}`} placeholder="次数、时间、步数等，只能输入数字" type="number"></FieldInput>
          </FieldItem>
          <FieldItem label="单位" required>
            <Picker mode="selector" range={range} value={unit} onChange={ e => this.handleInput('unit', e)}>
              <View className="picker-value">
                {range[unit]}
              </View>
            </Picker>
          </FieldItem>
          <FieldItem label="组数" required>
            <FieldInput onInput={e => this.handleInput('group_num', e)} value={`${group_num}`} placeholder="只能输入数字" type="number" maxlength={2}></FieldInput>
          </FieldItem>
          <FieldItem
            label="间隔时间"
            explain="数字+单位格式，h|m|s分别表示时分秒，不区分大小写，如：1h"
          >
            <FieldInput onInput={e => this.handleInput('sleep_time', e)} value={sleep_time} placeholder="请输入"></FieldInput>
          </FieldItem>
        </View>
        <View className="btn-container">
          <CommonButton type="primary" size="full-line" onClick={this.handleSubmit.bind(this)}>提交</CommonButton>
        </View>
      </View>
    )
  }
}

export default SportAdd

import Taro,{ Component, Config } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import CommonButton from '@/components/button'
import FieldItem from '@/components/fields/item'
import FieldInput from '@/components/fields/input'
import { add, update, detail } from '@/actions/sport'
import { units } from '@/constants/enums'
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
      detail(this.sportId).then((res: any) => {
        const sport = res.result.data
        this.setState({
          name: sport.name,
          mark: sport.mark,
          value: sport.value,
          unit: sport.unit,
          group_num: sport.group_num,
          sleep_time: sport.sleep_time
        })
      })
    }
  }
  async handleSubmit() {
    const { isValid, msg } = this.valid()
    if(!isValid) {
      return Taro.showToast({title: msg, icon: 'none' })
    }
    const { name, mark, value, unit, group_num, sleep_time } = this.state
    let res: any = null
    if(!this.sportId) {
      res = await add({ name, mark, value, unit, group_num, sleep_time })
    } else {
      res = await update(this.sportId, { name, mark, value, unit, group_num, sleep_time })
    }
    Taro.showToast({ title: '提交成功', icon: 'none' })
    Taro.navigateBack()
    return res
  }
  valid() {
    const { name, value, sleep_time } = this.state
    if(!name) {
      return {
        isValid: false,
        msg: '请输入项目名！'
      }
    }
    if(!value) {
      return {
        isValid: false,
        msg: '请输入数值！'
      }
    } else if(isNaN(+value)) {
      return {
        isValid: false,
        msg: '数值只能为数字！'
      }
    }
    const sleep_time_reg_exp = /^\d+[h|H|m|M|s|S]$/
    if(!sleep_time) {
      return {
        isValid: false,
        msg: '请输入间隔时间！'
      }
    } else if(!sleep_time_reg_exp.test(sleep_time)) {
      return {
        isValid: false,
        msg: '间隔时间不符合规则！'
      }
    }
    return {
      isValid: true,
      msg: '校验成功！'
    }
  }
  handleInput(key, e) {
    this.setState({
      [key]: e.detail.value
    })
  }
  render() {
    const { name, mark, value, unit, group_num, sleep_time } = this.state
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
            <Picker mode="selector" range={units} value={unit} onChange={ e => this.handleInput('unit', e)}>
              <View className="picker-value">
                {units[unit]}
              </View>
            </Picker>
          </FieldItem>
          <FieldItem label="组数" required>
            <FieldInput onInput={e => this.handleInput('group_num', e)} value={`${group_num}`} placeholder="只能输入数字" type="number" maxlength={2}></FieldInput>
          </FieldItem>
          <FieldItem
            label="间隔时间"
            explain="数字+单位格式，h|m|s分别表示时分秒，不区分大小写，如：1h"
            required
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

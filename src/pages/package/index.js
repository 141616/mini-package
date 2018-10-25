import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

export default class Package extends Component {
  config = {
    navigationBarTitleText: '明细'
  }

  constructor () {
    super(...arguments)
    this.setState = {
      current: 0,
      tabList: [
        { title: '概览', iconType: 'home' },
        { title: '记录', iconType: 'bullet-list' },
        { title: '消息', iconType: 'bell' },
        { title: '我', iconType: 'user' }
      ],
      objectId: ''
    }
  }

  componentWillMount () {
  }

  switchTab () {
    console.log(arguments)
  }

  render () {
    const objectId = this.$router.params.objectId
    return (
      <View>
        <View>{objectId}</View>
        <AtTabBar
          fixed
          tabList={[
            { title: '概览', iconType: 'home' },
            { title: '记录', iconType: 'bullet-list' },
            { title: '消息', iconType: 'bell' },
            { title: '我', iconType: 'user' }
          ]}
          onClick={this.switchTab}
          current={this.state.current}
        />
      </View>
    )
  }
}
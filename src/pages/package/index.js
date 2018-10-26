import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import Home from './home'
import Me from './me'
import Record from './record'
import Message from './message'

export default class Package extends Component {
  config = {
    navigationBarTitleText: '明细'
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: 1,
      tabList: [
        { title: '概览', selectedIconType: 'home', iconType: 'home' },
        { title: '记录', selectedIconType: 'bullet-list', iconType: 'bullet-list' },
        { title: '消息', selectedIconType: 'bell', iconType: 'bell' },
        { title: '我', selectedIconType: 'user', iconType: 'user' }
      ]
    }
  }

  componentWillMount () {
  }

  switchTab (current) {
    this.setState({
      current
    })
  }

  handleClick () {
    this.setState({ current: 2 })
  }

  render () {
    // const objectId = this.$router.params.objectId
    return (
      <View>
        <Home isShow={this.state.current === 0} />
        <Record isShow={this.state.current === 1} />
        <Message isShow={this.state.current === 2} />
        <Me isShow={this.state.current === 3} />
        <Button onClick={this.handleClick}>click</Button>
        <AtTabBar
          fixed
          color='#333'
          selectedColor='#6190E8'
          iconSize={24}
          fontSize={14}
          tabList={this.state.tabList}
          onClick={this.switchTab}
          current={this.state.current}
        />
      </View>
    )
  }
}
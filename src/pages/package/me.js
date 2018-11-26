import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class Me extends Component {
  render () {
    let {
      isShow
    } = this.props
    return (
      <View style={isShow ? 'display: block' : 'display: none'}>
        我
      </View>
    )
  }
}
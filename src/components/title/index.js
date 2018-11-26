import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.css'

export default class Title extends Component {
  constructor () {
    super(...arguments)
  }

  render () {
    let {
      title
    } = this.props
    return (
      <View className='com__title'>
        {title}
      </View>
    )
  }
}
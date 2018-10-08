import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from "taro-ui"

export default class PackageList extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
  }

  render () {
    return (
      <View>
        <AtCard
          title='我是标题'
        >
          我是内容
        </AtCard>
      </View>
    )
  }
}

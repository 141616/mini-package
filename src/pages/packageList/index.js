import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from "taro-ui"
import Bmob from '../../utils/Bmob'

export default class PackageList extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    this.state = {
      packages: []
    }
  }

  componentDidMount () {
    const query = Bmob.Query('packages')
    query.find().then(res => {
      this.setState({
        packages: res
      })
    })
  }

  render () {
    return (
      <View>
        {
          this.state.packages.map(pack => {
            return (
              <AtCard
                title={pack.name}
                thumb={pack.icon}
                key={pack.objectId}
              >
                {pack.description}
              </AtCard>
            )
          })
        }
      </View>
    )
  }
}

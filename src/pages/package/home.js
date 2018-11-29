import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import MaterialItem from '../../components/material-item'

class Home extends Component {
  constructor() {
    super(...arguments)
    this.state = {
    }
  }

  render () {
    let {
      isShow,
      materials,
      getMaterialsById
    } = this.props

    return (
      <View style={isShow ? 'display: block' : 'display: none'}>
        <MaterialItem title='钢材' type='steel' materials={materials} getMaterialsById={getMaterialsById} />
      </View>
    )
  }
}

Home.defaultProps = {
  materials: []
}

export default Home
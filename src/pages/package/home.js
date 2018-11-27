import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Title from '../../components/title'

import './echarts.scss'
import chartInitFn from '../../utils/echarts'

class Home extends Component {

  config = {
    usingComponents: {
      'ec-canvas': '../../components/ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  constructor() {
    super(...arguments)
    this.state = {
      ec: {
        lazyLoad: true
      }
    }
  }

  setCom (com) {
    this.ecCom = com
  }

  initEc (data) {
    if (!this.ecCom) {
      return
    }
    this.ecCom.init(chartInitFn(data))
  }

  render () {
    let {
      isShow,
      materials
    } = this.props
    if (materials.length) {
      // 延迟渲染echarts
      this.initEc(materials)
    }

    return (
      <View style={isShow ? 'display: block' : 'display: none'}>
        <Title title='仓库' />
        <View className='echarts-wrapper'>
          <View className='echarts'>
            <ec-canvas ref={this.setCom} canvas-id='mychart-area' ec={this.state.ec}></ec-canvas>
          </View>
        </View>
      </View>
    )
  }
}

Home.defaultProps = {
  materials: []
}

export default Home